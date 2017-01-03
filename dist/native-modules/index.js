'use strict';

exports.__esModule = true;

var _aureliaFilter = require('./aurelia-filter');

Object.keys(_aureliaFilter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaFilter[key];
    }
  });
});