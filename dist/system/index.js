'use strict';

System.register(['aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var Config;
  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {
      function configure(aurelia) {
        aurelia.plugin('aurelia-form');

        aurelia.container.get(Config).configureNamespace('spoonx/filter', {
          location: './{{framework}}/{{view}}.html'
        });

        aurelia.globalResources('./filter');
      }

      _export('configure', configure);
    }
  };
});