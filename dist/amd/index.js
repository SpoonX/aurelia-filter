define(['exports', './aurelia-filter'], function (exports, _aureliaFilter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaFilter).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaFilter[key];
      }
    });
  });
});