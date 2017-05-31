var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

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

import { inject, customElement, bindable, bindingMode } from 'aurelia-framework';
import { resolvedView } from 'aurelia-view-manager';
import { CriteriaBuilder } from './criteriaBuilder';
import { Configuration } from 'aurelia-config';

export let Filter = (_dec = customElement('filter'), _dec2 = resolvedView('spoonx/filter', 'filter'), _dec3 = inject(Configuration.of('aurelia-filter')), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class Filter extends CriteriaBuilder {

  constructor(config) {
    super();

    _initDefineProp(this, 'criteria', _descriptor, this);

    _initDefineProp(this, 'columns', _descriptor2, this);

    _initDefineProp(this, 'entity', _descriptor3, this);

    _initDefineProp(this, 'showIdColumns', _descriptor4, this);

    _initDefineProp(this, 'excludeColumns', _descriptor5, this);

    this.filters = [];
    this.fieldTypes = [];
    this.fieldEnumerations = {};
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
      options: []
    };
    this.valueElement = {
      key: 'value',
      type: 'string',
      label: false,
      attributes: {
        style: 'margin-bottom: 0' }
    };
    this.operatorElement.options = config.operatorOptions;
  }

  attached() {
    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    this.fieldElement.options.map(filter => {
      this.fieldTypes[filter.value] = filter.type === 'datetime' ? 'datetime-local' : filter.type;

      if (filter.type === 'select') {
        this.fieldEnumerations[filter.value] = filter.options || [];
      }
    });

    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      this.parseCriteria(this.criteria.where);

      if (this.filters.length > 0) {
        return;
      }
    }

    this.create();
  }

  parseCriteria(criteriaWhere, orIndex) {
    let data = {};

    if (criteriaWhere.or) {
      return criteriaWhere.or.forEach((criteria, i) => {
        this.parseCriteria(criteria, i);
      });
    }

    Object.keys(criteriaWhere).forEach((field, i) => {
      data = Object.assign(this.buildFieldData(criteriaWhere[field]), { field: field });

      Object.keys(criteriaWhere[field]).forEach(property => {
        let nestedCriteria = criteriaWhere[field][property];

        if (typeof nestedCriteria !== 'object' || Array.isArray(nestedCriteria)) {
          return;
        }

        this.parseCriteria({ [`${field}.${property}`]: nestedCriteria }, orIndex, i);
      });

      if (typeof orIndex !== 'undefined' && !this.filters[orIndex] || i === 0) {
        return this.create(undefined, data, true);
      }

      if (typeof orIndex !== 'undefined') {
        return this.create(orIndex, data, true);
      }

      this.create(0, data, true);
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

  create(blockIndex, data, skipOnChange) {
    if (data && data.field) {
      let options = this.fieldElement.options.map(option => option.value);

      if (options.indexOf(data.field) < 0) {
        return;
      }
    }

    let valueElement = Object.create(this.valueElement);
    let fieldName = data ? data.field : this.columns[0].value;

    valueElement.type = this.fieldTypes[fieldName] || 'string';

    if (valueElement.type === 'select') {
      if (!skipOnChange) {
        data = {
          field: fieldName,
          value: this.fieldEnumerations[fieldName][0],
          operator: this.operatorElement.options[0].value
        };
      }

      valueElement.options = this.fieldEnumerations[fieldName];
    }

    let filter = {
      field: this.fieldElement,
      operator: this.operatorElement,
      value: valueElement,
      data: data || {}
    };

    if (typeof blockIndex !== 'undefined') {
      this.filters[blockIndex].push(filter);
      if (!skipOnChange && valueElement.type === 'select') {
        this.onChange(blockIndex, this.filters[blockIndex].length - 1, true);
      }

      return;
    }

    this.filters.push([filter]);

    if (!skipOnChange && valueElement.type === 'select') {
      this.onChange(this.filters.length - 1, 0, true);
    }
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
    let filterValue = this.filters[blockIndex][index].data.value;

    if (isValue && (filterValue === '' || filterValue === undefined)) {
      this.filters[blockIndex][index].data.hasError = true;

      return;
    }

    this.filters[blockIndex][index].data.hasError = false;

    if (typeof filterValue !== 'undefined') {
      this.updateCriteria();
    }

    if (isValue) {
      return;
    }

    for (let field of this.columns) {
      if (this.filters[blockIndex][index].data.field === field.value) {
        let type = field.type === 'datetime' ? 'datetime-local' : field.type;

        this.filters[blockIndex][index].value.type = type || 'string';

        if (type === 'select') {
          this.filters[blockIndex][index].value.options = field.options;

          this.filters[blockIndex][index].data.value = field.options.length ? field.options[0].value : undefined;
        }

        break;
      }
    }
    if (typeof filterValue !== 'undefined') {
      this.updateCriteria();
    }
  }

  getEntityFields() {
    let metaData = this.entity.getMeta().metadata;
    let columns = metaData.types;

    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns, { metaData });

    if (Object.keys(metaData.associations).length < 1) {
      return;
    }

    let repositories = this.entity.getRepository().entityManager.repositories;

    for (let association in metaData.associations) {
      if (!metaData.associations.hasOwnProperty(association)) {
        continue;
      }

      let entityName = metaData.associations[association].entity;

      if (!repositories[entityName]) {
        return;
      }

      let repoData = repositories[entityName].getMeta().metadata.types;

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, { entityName });
    }
  }

  generateFields(columns, { entityName, metaData } = {}) {
    let excludeColumns = this.excludeColumns ? this.excludeColumns.replace(/\s/g, '').split(',') : [];

    if (this.showIdColumns) {
      columns.id = 'number';
    }

    for (let column in columns) {
      if (!columns.hasOwnProperty(column)) {
        continue;
      }

      let columnName = entityName ? entityName + '.' + column : column;

      if (entityName && excludeColumns.indexOf(entityName) > -1 || excludeColumns.indexOf(columnName) > -1) {
        continue;
      }

      let filterColumn = {
        name: columnName,
        value: columnName,
        type: columns[column] || 'string'
      };

      if (metaData.enumerations && column in metaData.enumerations) {
        filterColumn.type = 'select';
        filterColumn.options = metaData.enumerations[column];
      }

      this.columns.push(filterColumn);
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec4], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'showIdColumns', [bindable], {
  enumerable: true,
  initializer: function () {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'excludeColumns', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);