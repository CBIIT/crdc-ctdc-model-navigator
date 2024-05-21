/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import './DataDictionaryTable.css';
import {
  createFileName,
} from '../../utils';
import DataDictionaryCategory from '../DataDictionaryCategory';

/**
 * Little components presents an overview of the types in a dictionary organized by category
 *
 * @param {dictionary} params
 */
const DataDictionaryTable = ({
  classes, model, highlightingNodeID, expandNode, dictionaryName, pdfDownloadConfig,
}) => {
  return (
    <>
      <p className={classes.tableInfo}>
        <span>{dictionaryName}</span>
        <span> dictionary has </span>
        <span>{model.nodes().length}</span>
        <span> nodes and </span>
        <span>{model.props().length}</span>
        <span> properties </span>
      </p>
      <div className={classes.tableBody}>
        {model.tag_kvs('Category').map(([,category]) => (
          <DataDictionaryCategory
            key={category}
            nodes={model.tagged_items('Category', category)}
            category={category}
            highlightingNodeID={highlightingNodeID}
            expandNode={expandNode}
            pdfDownloadConfig={pdfDownloadConfig}
          />
        ))}
      </div>
    </>
  );
};

DataDictionaryTable.propTypes = {
  model: PropTypes.object,
  highlightingNodeID: PropTypes.string,
  expandNode: PropTypes.func,
  dictionaryName: PropTypes.string,
};

DataDictionaryTable.defaultProps = {
  model: PropTypes.object,
  highlightingNodeID: null,
  expandNode: () => {},
  dictionaryName: '',
};

const styles = () => ({
  tableBody: {
  },
  tableInfo: {
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '15px',
    color: '#32495A',
    fontFamily: 'Lato',
    fontSize: '14px',
    letterSpacing: '0',
    lineHeight: '26.06px',
  },
});

export default withStyles(styles)(DataDictionaryTable);
