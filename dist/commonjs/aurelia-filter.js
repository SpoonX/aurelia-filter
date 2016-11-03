'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaViewManager = require('aurelia-view-manager');

var _criteriaBuilder = require('./criteriaBuilder');

function configure(aurelia) {
  aurelia.plugin('aurelia-form');

  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('spoonx/filter', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./filter');
}