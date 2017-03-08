'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = undefined;
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

var config = exports.config = {
  'aurelia-filter': {
    operatorOptions: [{ name: 'equals', value: 'equals' }, { name: 'not equals', value: 'not' }, { name: 'in', value: 'in' }, { name: 'not in', value: '!' }, { name: 'contains', value: 'contains' }, { name: 'begins with', value: 'startsWith' }, { name: 'ends with', value: 'endsWith' }, { name: 'between', value: 'between' }, { name: 'greater than', value: 'greaterThan' }, { name: 'less than', value: 'lessThan' }, { name: 'less or equal than', value: 'lessThanOrEqual' }, { name: 'greater or equal than', value: 'greaterThanOrEqual' }]
  }
};