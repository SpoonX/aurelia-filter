'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Filter = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var _aureliaFramework = require('aurelia-framework');

var _aureliaViewManager = require('aurelia-view-manager');

var _criteriaBuilder = require('./criteriaBuilder');

var _aureliaConfig = require('aurelia-config');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}



function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Filter = exports.Filter = (_dec = (0, _aureliaFramework.customElement)('filter'), _dec2 = (0, _aureliaViewManager.resolvedView)('spoonx/filter', 'filter'), _dec3 = (0, _aureliaFramework.inject)(_aureliaConfig.Configuration.of('aurelia-filter')), _dec4 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = function (_CriteriaBuilder) {
  _inherits(Filter, _CriteriaBuilder);

  function Filter(config) {
    

    var _this = _possibleConstructorReturn(this, _CriteriaBuilder.call(this));

    _initDefineProp(_this, 'criteria', _descriptor, _this);

    _initDefineProp(_this, 'columns', _descriptor2, _this);

    _initDefineProp(_this, 'entity', _descriptor3, _this);

    _initDefineProp(_this, 'showIdColumns', _descriptor4, _this);

    _initDefineProp(_this, 'excludeColumns', _descriptor5, _this);

    _this.filters = [];
    _this.fieldTypes = [];
    _this.fieldEnumerations = {};
    _this.fieldElement = {
      key: 'field',
      type: 'select',
      label: false,
      options: []
    };
    _this.operatorElement = {
      key: 'operator',
      type: 'select',
      label: false,
      options: []
    };
    _this.valueElement = {
      key: 'value',
      type: 'string',
      label: false,
      attributes: {
        style: 'margin-bottom: 0' }
    };

    _this.operatorElement.options = config.operatorOptions;
    return _this;
  }

  Filter.prototype.attached = function attached() {
    var _this2 = this;

    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    this.fieldElement.options.map(function (filter) {
      _this2.fieldTypes[filter.value] = filter.type === 'datetime' ? 'datetime-local' : filter.type;

      if (filter.type === 'select') {
        _this2.fieldEnumerations[filter.value] = filter.options || [];
      }
    });

    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      this.parseCriteria(this.criteria.where);

      if (this.filters.length > 0) {
        return;
      }
    }

    this.create();
  };

  Filter.prototype.parseCriteria = function parseCriteria(criteriaWhere, orIndex) {
    var _this3 = this;

    var data = {};

    if (criteriaWhere.or) {
      return criteriaWhere.or.forEach(function (criteria, i) {
        _this3.parseCriteria(criteria, i);
      });
    }

    Object.keys(criteriaWhere).forEach(function (field, i) {
      data = Object.assign(_this3.buildFieldData(criteriaWhere[field]), { field: field });

      Object.keys(criteriaWhere[field]).forEach(function (property) {
        var _this3$parseCriteria;

        var nestedCriteria = criteriaWhere[field][property];

        if ((typeof nestedCriteria === 'undefined' ? 'undefined' : _typeof(nestedCriteria)) !== 'object' || Array.isArray(nestedCriteria)) {
          return;
        }

        _this3.parseCriteria((_this3$parseCriteria = {}, _this3$parseCriteria[field + '.' + property] = nestedCriteria, _this3$parseCriteria), orIndex, i);
      });

      if (typeof orIndex !== 'undefined' && !_this3.filters[orIndex] || i === 0) {
        return _this3.create(undefined, data, true);
      }

      if (typeof orIndex !== 'undefined') {
        return _this3.create(orIndex, data, true);
      }

      _this3.create(0, data, true);
    });
  };

  Filter.prototype.buildFieldData = function buildFieldData(field) {
    if (typeof field === 'string') {
      return { operator: 'equals', value: field };
    }

    if (Array.isArray(field)) {
      return { operator: 'in', value: field.join() };
    }

    if (Object.keys(field).length > 1) {
      return { operator: 'between', value: field['>='], between: field['<='] };
    }

    var key = Object.keys(field)[0];

    if (Array.isArray(field[key])) {
      return { operator: '!', value: field[key].join() };
    }

    return { operator: key, value: field[key] };
  };

  Filter.prototype.create = function create(blockIndex, data, skipOnChange) {
    if (data && data.field) {
      var options = this.fieldElement.options.map(function (option) {
        return option.value;
      });

      if (options.indexOf(data.field) < 0) {
        return;
      }
    }

    var valueElement = Object.create(this.valueElement);
    var fieldName = data ? data.field : this.columns[0].value;

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

    var filter = {
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
  };

  Filter.prototype.destroy = function destroy(blockIndex, index) {
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
  };

  Filter.prototype.onChange = function onChange(blockIndex, index, isValue) {
    var filterValue = this.filters[blockIndex][index].data.value;

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

    for (var _iterator = this.columns, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var field = _ref;

      if (this.filters[blockIndex][index].data.field === field.value) {
        var type = field.type === 'datetime' ? 'datetime-local' : field.type;

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
  };

  Filter.prototype.getEntityFields = function getEntityFields() {
    var metaData = this.entity.getMeta().metadata;
    var columns = metaData.types;

    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns, { metaData: metaData });

    if (Object.keys(metaData.associations).length < 1) {
      return;
    }

    var repositories = this.entity.getRepository().entityManager.repositories;

    for (var association in metaData.associations) {
      if (!metaData.associations.hasOwnProperty(association)) {
        continue;
      }

      var entityName = metaData.associations[association].entity;

      if (!repositories[entityName]) {
        return;
      }

      var repoData = repositories[entityName].getMeta().metadata.types;

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, { entityName: entityName });
    }
  };

  Filter.prototype.generateFields = function generateFields(columns) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        entityName = _ref2.entityName,
        metaData = _ref2.metaData;

    var excludeColumns = this.excludeColumns ? this.excludeColumns.replace(/\s/g, '').split(',') : [];

    if (this.showIdColumns) {
      columns.id = 'number';
    }

    for (var column in columns) {
      if (!columns.hasOwnProperty(column)) {
        continue;
      }

      var columnName = entityName ? entityName + '.' + column : column;

      if (entityName && excludeColumns.indexOf(entityName) > -1 || excludeColumns.indexOf(columnName) > -1) {
        continue;
      }

      var filterColumn = {
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
  };

  return Filter;
}(_criteriaBuilder.CriteriaBuilder), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'columns', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'entity', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'showIdColumns', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'excludeColumns', [_aureliaFramework.bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);