import { Config } from 'aurelia-view-manager';

import { CriteriaBuilder } from './criteriaBuilder';

export function configure(aurelia) {
  aurelia.plugin('aurelia-form');

  aurelia.container.get(Config).configureNamespace('spoonx/filter', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./filter');
}