import React from 'react';
import { connect } from 'react-redux';
import ActionLayer from './ActionLayer';

const ReduxActionLayer = ((props) => <ActionLayer {...props}/>);
const mapStateToProps = (state) => ({
  isSearchMode: state.ddgraph.isSearchMode,
  overlayPropertyHidden: state.ddgraph.overlayPropertyHidden,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxActionLayer);