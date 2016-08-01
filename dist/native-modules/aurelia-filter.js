import { Config } from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.plugin('aurelia-form');

  aurelia.container.get(Config).configureNamespace('spoonx/filter', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./filter');
}