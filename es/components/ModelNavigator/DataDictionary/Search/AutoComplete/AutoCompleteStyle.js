"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = function _default() {
  return {
    suggestions: {
      backgroundColor: "red"
    },
    autoComplete: {
      // border: '1px solid #9b9b9b',
      borderRadius: "25px"
    },
    inputWrapper: {
      height: "35px",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxSizing: "border-box" /* include padding from height*/,
      width: "calc(100% - 10px)" /* for borders and paddings */,
      padding: "5px"
    },
    emptySuggestionList: {}
  };
};