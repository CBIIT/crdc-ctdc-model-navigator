import React, { useEffect, useState } from 'react';
import {
  DialogContent,
  withStyles,
  IconButton,
  Backdrop,
  Dialog,
  Button,
} from '@material-ui/core';
import { saveAs } from 'file-saver';
import { ArrowDownward } from '@material-ui/icons';
// import MarkdownPDF from "markdown-pdf";
import CloseIcon from '@material-ui/icons/Close';
import { pdf } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';
import { marked } from "marked";
import html2pdf from 'html2pdf.js';
import PdfTemplate from './ReadMePdf';
import styles from './ReadMe.style';
import CustomTheme from './ReadMe.theme.config';
import { createFileName } from '../utils';
import footer_line from './footer_line.png';

const date = new Date().toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' });

export const downloadFile = async (title, content) => {
  const cossnt = await marked(content);
    console.log(cossnt);
    // const blob = await pdf((
    //   <PdfTemplate
    //     title={title}
    //     content={content}
    //   />
    // )).toBlob();
    // const fileName = createFileName('read_me', 'ICDC_Data_Model-');
    // saveAs(blob, `${fileName}.pdf`);
}
  /** download pdf of marked down file 
   * 1.convert or generate html element of marked object
   * 2. uses html2pdf library to convert html to pdf
   * all the html style from marked down file will be reflected on PDF
   */
  const downloadMarkdownPdf = async (title, content) => {
    /** create html elment for pdf - convert marked object to html*/
    const readMeContent = document.createElement('div');
    readMeContent.innerHTML += '<span>Understanding the ICDC Data Model</span>';
    readMeContent.innerHTML += marked(content);
    
    /** set pdf fileneam */
    const fileName = createFileName('read_me', 'ICDC_Data_Model-');
    /** configure pdf increase pixel of the PDF*/
    const options = {
      margin:       1,
      filename:     fileName,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  {
        dpi: 192,
        scale:4,
        letterRendering: true,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .set(options)
      .from(readMeContent)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageSz = pdf.internal.pageSize;
        const pgHeight = pageSz.getHeight();
        const pgWidth = pageSz.getWidth();

        /** set header and footer content for each pdf page
         * page height and width is used for assigning header and footer element
         * adjust height & width for footer
         * adjust height & width for header
         */
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFont('Source Sans Pro,sans-serif');
          pdf.setFontSize(8);
          pdf.setTextColor(0);
          pdf.text(pgWidth - 2, pgHeight - 0.5, `${date} | ${i}`);
          pdf.text(pgWidth - 7.5, pgHeight - 0.5, `CANINECOMMONS.CANCER.GOV/#/ICDC-DATA-MODEL`);
          pdf.addImage(footer_line, 'JPEG', pgWidth - 7.5, pgHeight - 0.75, 6.5, 0.05);
        }
    }).save();
}

const ReadMeDialogComponent = ({
  classes,
  display,
  displayReadMeDialog,
  content,
  title,
}) => {

  if(!content) {
    return (<></>)
  }

  return (
  <CustomTheme>
    <Dialog
      open={display}
      onClose={displayReadMeDialog}
      maxWidth="md"
      className={classes.dialogBox}
      BackdropProps={{
        timeout: 500,
      }}
      BackdropComponent={Backdrop}
    >
      <div className={classes.titleContent}>
        <div className={classes.title}>
          <span>
            {title}
          </span>
        </div>
        <div item xs={1} className={classes.closeBtn}>
          <Button
            className={classes.downloadBtn}
            startIcon={<ArrowDownward className={classes.downloadIcon} id="download_arrow_all" />}
            onClick={() => downloadMarkdownPdf(title, content)}
          />
          <IconButton
            onClick={displayReadMeDialog}
          >
            <CloseIcon
              fontSize="small"
              className={classes.closeBtn}
            />
          </IconButton>
        </div>
      </div>
      <div
        className={classes.content}
        id="readMe_content"
      >
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </Dialog>
  </CustomTheme>
)};

export default withStyles(styles)(ReadMeDialogComponent);
