import {Config}    from 'aurelia-view-manager';
import {getLogger} from 'aurelia-logging';

export function configure(aurelia) {
  aurelia.plugin('aurelia-form');

  aurelia.container.get(Config).configureNamespace('spoonx/filter', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./filter');
}

const logger = getLogger('aurelia-filter');

export {
  logger
};
