'use strict';

System.register(['aurelia-view-manager', './criteriaBuilder'], function (_export, _context) {
  "use strict";

  var Config, CriteriaBuilder;
  function configure(aurelia) {
    aurelia.plugin('aurelia-form');

    aurelia.container.get(Config).configureNamespace('spoonx/filter', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./filter');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }, function (_criteriaBuilder) {
      CriteriaBuilder = _criteriaBuilder.CriteriaBuilder;
    }],
    execute: function () {}
  };
});