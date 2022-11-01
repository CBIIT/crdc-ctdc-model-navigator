import React, { useState } from 'react';
import {
  withStyles,
  createTheme,
  MuiThemeProvider,
  Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ArrowDownward, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { pdf } from '@react-pdf/renderer';
import LandscapePDFDoc from '../../LandscapeNodePDF/Pdf';
import PdfDocument from '../../NodePDF/Pdf';
import { category2NodeList, sortByCategory } from '../../utils/download-helper-functions';
import { downloadFile } from '../../../ReadMe/ReadMe.component';
import { convertToTSV, createFileName } from '../../../utils';

const DOWNLOADS = 'DOWNLOADS';
const FILE_TYPE_FULL_DICTIONARY = 'Full dictionary';
const FILE_TYPE_README = 'ReadMe';
const FILE_TYPE_TEMPLATES = 'All Data Loading Templates';
const fileTypes = [FILE_TYPE_FULL_DICTIONARY, FILE_TYPE_README, FILE_TYPE_TEMPLATES];

const MuiMenu = withStyles({
  paper: {
    border: '1px solid #0D71A3',
    width: '150px',
    borderRadius: '0px',
    '& .MuiList': {
      marginTop: '0px',
    },
    '& .MuiPaper': {
      left: '30px',
    },
  },
  list: {
    paddingBottom: '0px',
    paddingTop: '0px',
    marginTop: '0px',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const MuiMenuItem = withStyles(() => ({
  root: {
    '&:focus': {
      backgroundColor: 'none',
      '& .MuiListItemIcon-root': {
        backgroundColor: 'none',
      },
    },
  },
}))(MenuItem);

const theme = {
  overrides: {
    MuiButton: {
      root: {
        minWidth: '10px',
      },
      startIcon: {
        marginRight: '0px',
      },
      label: {
        justifyContent: 'left',
      },
      outlined: {
        border: 'none',
      },
    },
  },
};

const generatePdfDocument = async (object, config, setLoading, fileName) => {
  const document = (config.type === 'document') ? object : [object];

  const blob = await pdf((
    config.landscape ? <LandscapePDFDoc nodes={document} /> : <PdfDocument nodes={document} />
  )).toBlob();
  setLoading(false);
  saveAs(blob, `${fileName}.pdf`);
};

const DownloadFileTypeBtn = ({
  classes,
  fileName,
  config,
  documentsData,
  readMeContent,
  readMeConfig,
}) => {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [label, setLabel] = useState('DOWNLOADS');
  const [isLoading, setLoading] = React.useState(false);

  const c2nl = category2NodeList(documentsData);
  const processedDocumentsData = sortByCategory(c2nl, documentsData);

  const clickHandler = (event) => {
    setLabel('DOWNLOADS');
    setAnchorElement(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorElement(null);
  };

  const setFileType = (value) => {
    setLabel(value);
    setAnchorElement(null);
  };

  const downloadPdf = () => {
    setLoading(true);
    setTimeout(() => {
      generatePdfDocument(processedDocumentsData, config, setLoading, fileName);
    }, 50);
  };

  const downloadTemplates = () => {
    // eslint-disable-next-line no-unused-vars
    const filteredDocumentsData = Object.fromEntries(Object.entries(documentsData).filter(([_key, value]) => value.template === 'Yes'));
    const nodesValueArray = Object.values(filteredDocumentsData);
    const nodesKeyArray = Object.keys(filteredDocumentsData);
    const nodesTSV = nodesValueArray.map((node) => node.template === 'Yes' && convertToTSV(node));

    const zip = new JSZip();
    nodesTSV.forEach((nodeTSV, index) => zip.file(createFileName(nodesKeyArray[index], 'ICDC_Data_Loading_Template-'), nodeTSV));

    zip.generateAsync({ type: 'blob' }).then((thisContent) => {
      saveAs(thisContent, createFileName('', 'ICDC_Data_Loading_Templates'));
    });
  };

  const downladFile = () => {
    switch (label) {
      case FILE_TYPE_FULL_DICTIONARY:
        return downloadPdf();
      case FILE_TYPE_README:
        return downloadFile(readMeConfig.readMeTitle, readMeContent);
      case FILE_TYPE_TEMPLATES:
        return downloadTemplates();
      default:
        return null;
    }
  };

  const getMenuItem = (type) => (
    <MuiMenuItem className={classes.menuItem} onClick={() => setFileType(type)}>
      {type}
    </MuiMenuItem>
  );

  const options = fileTypes.map((item) => getMenuItem(item));

  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      <Box className={classes.menu}>
        <Button
          disableRipple
          disabled={DOWNLOADS === label}
          className={classes.downloadBtn}
          startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow" />}
          onClick={downladFile}
        />
        <Button
          disableRipple
          aria-controls="mui-menu"
          variant="outlined"
          onClick={clickHandler}
          className={classes.displayBtn}
          startIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        >
          { isLoading ? (<div>Loading...</div>) : (
            <div className={classes.dropDownText}>
              {label}
            </div>
          )}
        </Button>
        <MuiMenu
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={closeHandler}
        >
          {options}
        </MuiMenu>
      </Box>
    </MuiThemeProvider>
  );
};

const styles = () => ({
  menu: {
    border: '1px solid #0D71A3',
    boxSizing: 'border-box',
    backgroundColor: '#0D71A3',
    borderRadius: '5px',
    float: 'left',
  },
  displayBtn: {
    width: '150px',
    height: '2em',
    boxSizing: 'border-box',
    color: '#0d71a3',
    backgroundColor: '#F2F1F1',
    textTransform: 'none',
    padding: '7px',
    marginRight: '0',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F2F1F1',
    },
  },
  dropDownText: {
    lineHeight: '1.05',
    fontSize: '10px',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    color: '#0d71a3',
    textAlign: 'left',
    position: 'relative',
  },
  arrowDownward: {
    fontSize: '30px',
    color: '#DC762F',
  },
  menuItem: {
    fontSize: '10px',
    fontWeight: '700',
    paddingLeft: '22px',
    color: '#0d71a3',
    '&:last-child': {
      backgroundColor: '#CBE2EE',
      '&:hover': {
        backgroundColor: '#CBE2EE',
      },
    },
  },
  downloadBtn: {
    float: 'right',
    marginBottom: '-20px',
    height: '27px',
    width: '27px',
    backgroundColor: '#0D71A3',
    borderRadius: '0px',
    paddingLeft: '8px',
    '&:hover': {
      backgroundColor: '#0D71A3',
    },
  },
  downloadIcon: {
    color: '#fff',
    fontSize: '18px',
  },
});

export default withStyles(styles, { withTheme: true })(DownloadFileTypeBtn);