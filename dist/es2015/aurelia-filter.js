var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import extend from 'extend';
import { Config, resolvedView } from 'aurelia-view-manager';
import { customElement, bindable, bindingMode } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia.plugin('aurelia-form');

  aurelia.container.get(Config).configureNamespace('spoonx/filter', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./filter');
}

export let CriteriaBuilder = class CriteriaBuilder {

  updateCriteria() {
    let blocks = [];

    this.filters.forEach((block, index) => {
      let filtersParsed = {};

      block.forEach(filter => {
        if (!this.hasValue(filter.data.value)) {
          return;
        }

        filtersParsed = extend(filtersParsed, this.parseField(filter.data.field, this.parseOperator(filter.data)));
      });

      blocks.push(filtersParsed);
    });

    let criteriaWhere = blocks.length > 1 ? { where: { or: blocks } } : { where: blocks[0] };
    let currentSort = this.criteria.sort || {};

    this.criteria = Object.assign(criteriaWhere, { sort: currentSort });
  }

  parseOperator(filter) {
    switch (filter.operator) {
      case 'equals':
        return filter.value;
      case 'between':
        return this.parseBetween(filter);
      case 'in':
        return this.toArray(filter.value);
      case '!':
        filter.operator = '!';
        filter.value = this.toArray(filter.value);
      default:
        return { [filter.operator]: filter.value };
    }
  }

  parseBetween(data, valueOperator = '>=', betweenOperator = '<=') {
    if (!this.hasValue(data.between)) {
      return;
    }

    return {
      [valueOperator]: data.value,
      [betweenOperator]: data.between
    };
  }

  parseField(fieldName, data) {
    var fieldName = fieldName.split('.');

    if (fieldName.length > 1) {
      return { [fieldName[0]]: { [fieldName[1]]: data } };
    }

    return { [fieldName[0]]: data };
  }

  toArray(value) {
    return value.split(',').map(i => {
      return i.trim();
    });
  }

  hasValue(value) {
    return typeof value !== 'undefined' && value !== '';
  }
};

export let Filter = (_dec = customElement('filter'), _dec2 = resolvedView('spoonx/filter', 'filter'), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = class Filter extends CriteriaBuilder {

  constructor() {
    super();

    _initDefineProp(this, 'criteria', _descriptor, this);

    _initDefineProp(this, 'columns', _descriptor2, this);

    _initDefineProp(this, 'entity', _descriptor3, this);

    this.filters = [];
    this.fieldElement = {
      key: 'field',
      type: 'select',
      label: false,
      options: []
    };
    this.operatorElement = {
      key: 'operator',
      type: 'select',
      label: false,
      options: [{ name: 'equals', value: 'equals' }, { name: 'not equals', value: 'not' }, { name: 'in', value: 'in' }, { name: 'not in', value: '!' }, { name: 'contains', value: 'contains' }, { name: 'begins with', value: 'startsWith' }, { name: 'ends with', value: 'endsWith' }, { name: 'between', value: 'between' }, { name: 'greater than', value: 'greaterThan' }, { name: 'less than', value: 'lessThan' }, { name: 'less or equal than', value: 'lessThanOrEqual' }, { name: 'greater or equal than', value: 'greaterThanOrEqual' }]
    };
    this.valueElement = {
      key: 'value',
      type: 'string',
      label: false,
      attributes: {
        style: 'margin-bottom: 0' }
    };
  }

  attached() {
    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      return this.parseCriteria(this.criteria.where);
    }

    this.valueElement.type = this.columns[0].type || 'string';
    this.create();
  }

  parseCriteria(criteriaWhere) {
    let data = {};

    if (criteriaWhere.or) {
      criteriaWhere.or.forEach((block, i) => {
        Object.keys(block).forEach(field => {
          data = Object.assign(this.buildFieldData(block[field]), { field: field });
          if (!this.filters[i]) {
            return this.create(undefined, data);
          }

          this.create(i, data);
        });
      });

      return;
    }

    Object.keys(criteriaWhere).forEach((field, i) => {
      data = Object.assign(this.buildFieldData(criteriaWhere[field]), { field: field });
      if (i === 0) {
        return this.create(undefined, data);
      }

      this.create(0, data);
    });
  }

  buildFieldData(field) {
    if (typeof field === 'string') {
      return { operator: 'equals', value: field };
    }

    if (Array.isArray(field)) {
      return { operator: 'in', value: field.join() };
    }

    if (Object.keys(field).length > 1) {
      return { operator: 'between', value: field['>='], between: field['<='] };
    }

    let key = Object.keys(field)[0];

    if (Array.isArray(field[key])) {
      return { operator: '!', value: field[key].join() };
    }

    return { operator: key, value: field[key] };
  }

  create(blockIndex, data) {
    let filter = {
      field: this.fieldElement,
      operator: this.operatorElement,
      value: Object.create(this.valueElement),
      data: data || {}
    };

    if (typeof blockIndex !== 'undefined') {
      return this.filters[blockIndex].push(filter);
    }

    this.filters.push([filter]);
  }

  destroy(blockIndex, index) {
    if (typeof index === 'undefined') {
      this.filters.splice(blockIndex, 1);
      this.updateCriteria();

      return;
    }

    if (!this.filters[blockIndex][index].data.value) {
      return this.filters[blockIndex].splice(index, 1);
    }

    this.filters[blockIndex].splice(index, 1);
    this.updateCriteria();
  }

  onChange(blockIndex, index, isValue) {
    if (typeof this.filters[blockIndex][index].data.value !== 'undefined') {
      this.updateCriteria();
    }

    if (isValue) {
      return;
    }

    for (let field of this.columns) {
      if (this.filters[blockIndex][index].data.field === field.value) {
        this.filters[blockIndex][index].value.type = field.type || 'string';

        break;
      }
    }
  }

  getEntityFields() {
    let metaData = this.entity.getMeta().metadata;
    let columns = metaData.types;

    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns);

    if (Object.keys(metaData.associations).length < 1) {
      return;
    }

    let repositories = this.entity.getRepository().entityManager.repositories;
    for (let association in metaData.associations) {
      let entityName = metaData.associations[association].entity;

      if (!repositories[entityName]) {
        return;
      }

      let repoData = repositories[entityName].getMeta().metadata.types;

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, entityName);
    }
  }

  generateFields(columns, entityName) {
    for (let column in columns) {
      let columnName = entityName ? entityName + '.' + column : column;

      this.columns.push({
        name: columnName,
        value: columnName,
        type: columns[column] || 'string'
      });
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec3], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'columns', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
})), _class2)) || _class) || _class);