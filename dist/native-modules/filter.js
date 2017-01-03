'use strict';

exports.__esModule = true;
exports.Filter = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

var _aureliaFramework = require('aurelia-framework');

var _aureliaViewManager = require('aurelia-view-manager');

var _criteriaBuilder = require('./criteriaBuilder');

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

var Filter = exports.Filter = (_dec = (0, _aureliaFramework.customElement)('filter'), _dec2 = (0, _aureliaViewManager.resolvedView)('spoonx/filter', 'filter'), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function (_CriteriaBuilder) {
  _inherits(Filter, _CriteriaBuilder);

  function Filter() {
    var _temp, _this, _ret;

    

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _CriteriaBuilder.call.apply(_CriteriaBuilder, [this].concat(args))), _this), _initDefineProp(_this, 'criteria', _descriptor, _this), _initDefineProp(_this, 'columns', _descriptor2, _this), _initDefineProp(_this, 'entity', _descriptor3, _this), _initDefineProp(_this, 'showIdColumns', _descriptor4, _this), _initDefineProp(_this, 'excludeColumns', _descriptor5, _this), _this.filters = [], _this.fieldTypes = [], _this.fieldElement = {
      key: 'field',
      type: 'select',
      label: false,
      options: []
    }, _this.operatorElement = {
      key: 'operator',
      type: 'select',
      label: false,
      options: [{ name: 'equals', value: 'equals' }, { name: 'not equals', value: 'not' }, { name: 'in', value: 'in' }, { name: 'not in', value: '!' }, { name: 'contains', value: 'contains' }, { name: 'begins with', value: 'startsWith' }, { name: 'ends with', value: 'endsWith' }, { name: 'between', value: 'between' }, { name: 'greater than', value: 'greaterThan' }, { name: 'less than', value: 'lessThan' }, { name: 'less or equal than', value: 'lessThanOrEqual' }, { name: 'greater or equal than', value: 'greaterThanOrEqual' }]
    }, _this.valueElement = {
      key: 'value',
      type: 'string',
      label: false,
      attributes: {
        style: 'margin-bottom: 0' }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Filter.prototype.attached = function attached() {
    var _this2 = this;

    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    this.fieldElement.options.map(function (filter) {
      _this2.fieldTypes[filter.name] = filter.type === 'datetime' ? 'datetime-local' : filter.type;
    });

    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      this.parseCriteria(this.criteria.where);

      if (this.filters.length > 0) {
        return;
      }
    }

    this.create();
  };

  Filter.prototype.parseCriteria = function parseCriteria(criteriaWhere) {
    var _this3 = this;

    var data = {};

    if (criteriaWhere.or) {
      criteriaWhere.or.forEach(function (block, i) {
        Object.keys(block).forEach(function (field) {
          data = Object.assign(_this3.buildFieldData(block[field]), { field: field });
          if (!_this3.filters[i]) {
            return _this3.create(undefined, data);
          }

          _this3.create(i, data);
        });
      });

      return;
    }

    Object.keys(criteriaWhere).forEach(function (field, i) {
      data = Object.assign(_this3.buildFieldData(criteriaWhere[field]), { field: field });

      if (i === 0) {
        return _this3.create(undefined, data);
      }

      _this3.create(0, data);
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

  Filter.prototype.create = function create(blockIndex, data) {
    if (data && data.field) {
      var options = this.fieldElement.options.map(function (option) {
        return option.value;
      });

      if (options.indexOf(data.field) < 0) {
        return;
      }
    }

    var valueElement = Object.create(this.valueElement);
    var fieldName = data ? data.field : this.columns[0].name;

    valueElement.type = this.fieldTypes[fieldName] || 'string';

    var filter = {
      field: this.fieldElement,
      operator: this.operatorElement,
      value: valueElement,
      data: data || {}
    };

    if (typeof blockIndex !== 'undefined') {
      return this.filters[blockIndex].push(filter);
    }

    this.filters.push([filter]);
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

        break;
      }
    }
  };

  Filter.prototype.getEntityFields = function getEntityFields() {
    var metaData = this.entity.getMeta().metadata;
    var columns = metaData.types;

    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns);

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

      this.generateFields(repoData, entityName);
    }
  };

  Filter.prototype.generateFields = function generateFields(columns, entityName) {
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

      this.columns.push({
        name: columnName,
        value: columnName,
        type: columns[column] || 'string'
      });
    }
  };

  return Filter;
}(_criteriaBuilder.CriteriaBuilder), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec3], {
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
})), _class2)) || _class) || _class);