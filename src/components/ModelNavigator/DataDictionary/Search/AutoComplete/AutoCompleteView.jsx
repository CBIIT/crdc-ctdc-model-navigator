import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';
import AutoCompleteInput from './AutoCompleteInput';
import AutoCompleteSuggestions, { SuggestionItem } from './AutoCompleteSuggestions';
import './AutoComplete.css';
import { SuggestionContext } from '../SearchContext';

import styles from './AutoCompleteStyle';

function AutoComplete({
  classes,
  inputPlaceHolderText,
  inputTitle,
}) {

//  const emptySuggestionsClassModifier = suggestionList.length === 0 // eslint-disable-line
//        ? 'auto-complete--empty-suggestion-list' : '';
  const {
    suggestionList,
    setSuggestionList,
    clickedSuggestionItem,
    setClickedSuggestionItem,
  } = useContext(SuggestionContext);
  return (
      <div
        className={
          clsx(classes.autoComplete,
               { [classes.emptySuggestionList]: suggestionList.length })
        }
      >
        <div className={classes.inputWrapper}>
          <AutoCompleteInput
            classes={ classes }
            placeHolderText={ inputPlaceHolderText }
            inputTitle={ inputTitle }
          />
        </div>
        <AutoCompleteSuggestions
          className={classes.suggestions}
          classes={classes}
        />
      </div>
  );
}


AutoComplete.propTypes = {
  suggestionList: PropTypes.arrayOf(PropTypes.shape(SuggestionItem)),
  inputPlaceHolderText: PropTypes.string,
  inputTitle: PropTypes.string,
  inputIcon: PropTypes.string,
};

AutoComplete.defaultProps = {
  suggestionList: [],
  inputPlaceHolderText: 'Search',
  inputTitle: 'Search Input',
  inputIcon: 'search',
};

export default withStyles(styles)(AutoComplete);
