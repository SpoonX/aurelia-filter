define(['exports', 'aurelia-view-manager', './criteriaBuilder'], function (exports, _aureliaViewManager, _criteriaBuilder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.plugin('aurelia-form');

    aurelia.container.get(_aureliaViewManager.Config).configureNamespace('spoonx/filter', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./filter');
  }
});