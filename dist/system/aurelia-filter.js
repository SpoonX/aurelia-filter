'use strict';

System.register(['aurelia-view-manager', './criteriaBuilder'], function (_export, _context) {
  "use strict";

  var Config, CriteriaBuilder, config;
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
    execute: function () {
      _export('config', config = {
        'aurelia-filter': {
          operatorOptions: [{ name: 'equals', value: 'equals' }, { name: 'not equals', value: 'not' }, { name: 'in', value: 'in' }, { name: 'not in', value: '!' }, { name: 'contains', value: 'contains' }, { name: 'begins with', value: 'startsWith' }, { name: 'ends with', value: 'endsWith' }, { name: 'between', value: 'between' }, { name: 'greater than', value: 'greaterThan' }, { name: 'less than', value: 'lessThan' }, { name: 'less or equal than', value: 'lessThanOrEqual' }, { name: 'greater or equal than', value: 'greaterThanOrEqual' }]
        }
      });

      _export('config', config);
    }
  };
});