define(['exports', 'extend', 'aurelia-view-manager', 'aurelia-framework'], function (exports, _extend, _aureliaViewManager, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Filter = exports.CriteriaBuilder = undefined;
  exports.configure = configure;

  var _extend2 = _interopRequireDefault(_extend);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  

  function configure(aurelia) {
    aurelia.plugin('aurelia-form');

    aurelia.container.get(_aureliaViewManager.Config).configureNamespace('spoonx/filter', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./filter');
  }

  var CriteriaBuilder = exports.CriteriaBuilder = function () {
    function CriteriaBuilder() {
      
    }

    CriteriaBuilder.prototype.updateCriteria = function updateCriteria() {
      var _this = this;

      var blocks = [];

      this.filters.forEach(function (block, index) {
        var filtersParsed = {};

        block.forEach(function (filter) {
          if (!_this.hasValue(filter.data.value)) {
            return;
          }

          filtersParsed = (0, _extend2.default)(filtersParsed, _this.parseField(filter.data.field, _this.parseOperator(filter.data)));
        });

        blocks.push(filtersParsed);
      });

      var criteriaWhere = blocks.length > 1 ? { where: { or: blocks } } : { where: blocks[0] };
      var currentSort = this.criteria.sort || {};

      this.criteria = Object.assign(criteriaWhere, { sort: currentSort });
    };

    CriteriaBuilder.prototype.parseOperator = function parseOperator(filter) {
      var _ref;

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
          break;
        default:
          break;
      }

      return _ref = {}, _ref[filter.operator] = filter.value, _ref;
    };

    CriteriaBuilder.prototype.parseBetween = function parseBetween(data) {
      var _ref2;

      var valueOperator = arguments.length <= 1 || arguments[1] === undefined ? '>=' : arguments[1];
      var betweenOperator = arguments.length <= 2 || arguments[2] === undefined ? '<=' : arguments[2];

      if (!this.hasValue(data.between)) {
        return;
      }

      return _ref2 = {}, _ref2[valueOperator] = data.value, _ref2[betweenOperator] = data.between, _ref2;
    };

    CriteriaBuilder.prototype.parseField = function parseField(fieldName, data) {
      var _ref4;

      fieldName = fieldName.split('.');

      if (fieldName.length > 1) {
        var _fieldName$, _ref3;

        return _ref3 = {}, _ref3[fieldName[0]] = (_fieldName$ = {}, _fieldName$[fieldName[1]] = data, _fieldName$), _ref3;
      }

      return _ref4 = {}, _ref4[fieldName[0]] = data, _ref4;
    };

    CriteriaBuilder.prototype.toArray = function toArray(value) {
      return value.split(',').map(function (i) {
        return i.trim();
      });
    };

    CriteriaBuilder.prototype.hasValue = function hasValue(value) {
      return typeof value !== 'undefined' && value !== '';
    };

    return CriteriaBuilder;
  }();

  var Filter = exports.Filter = (_dec = (0, _aureliaFramework.customElement)('filter'), _dec2 = (0, _aureliaViewManager.resolvedView)('spoonx/filter', 'filter'), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function (_CriteriaBuilder) {
    _inherits(Filter, _CriteriaBuilder);

    function Filter() {
      

      var _this2 = _possibleConstructorReturn(this, _CriteriaBuilder.call(this));

      _initDefineProp(_this2, 'criteria', _descriptor, _this2);

      _initDefineProp(_this2, 'columns', _descriptor2, _this2);

      _initDefineProp(_this2, 'entity', _descriptor3, _this2);

      _this2.filters = [];
      _this2.fieldElement = {
        key: 'field',
        type: 'select',
        label: false,
        options: []
      };
      _this2.operatorElement = {
        key: 'operator',
        type: 'select',
        label: false,
        options: [{ name: 'equals', value: 'equals' }, { name: 'not equals', value: 'not' }, { name: 'in', value: 'in' }, { name: 'not in', value: '!' }, { name: 'contains', value: 'contains' }, { name: 'begins with', value: 'startsWith' }, { name: 'ends with', value: 'endsWith' }, { name: 'between', value: 'between' }, { name: 'greater than', value: 'greaterThan' }, { name: 'less than', value: 'lessThan' }, { name: 'less or equal than', value: 'lessThanOrEqual' }, { name: 'greater or equal than', value: 'greaterThanOrEqual' }]
      };
      _this2.valueElement = {
        key: 'value',
        type: 'string',
        label: false,
        attributes: {
          style: 'margin-bottom: 0' }
      };
      return _this2;
    }

    Filter.prototype.attached = function attached() {
      if (this.entity) {
        this.getEntityFields();
      }

      this.fieldElement.options = this.columns;

      if (this.criteria.where && Object.keys(this.criteria.where).length) {
        return this.parseCriteria(this.criteria.where);
      }

      this.valueElement.type = this.columns[0].type || 'string';
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
      var filter = {
        field: this.fieldElement,
        operator: this.operatorElement,
        value: Object.create(this.valueElement),
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
      if (typeof this.filters[blockIndex][index].data.value !== 'undefined') {
        this.updateCriteria();
      }

      if (isValue) {
        return;
      }

      for (var _iterator = this.columns, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref5 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref5 = _i.value;
        }

        var field = _ref5;

        if (this.filters[blockIndex][index].data.field === field.value) {
          this.filters[blockIndex][index].value.type = field.type || 'string';

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
      for (var column in columns) {
        var columnName = entityName ? entityName + '.' + column : column;

        this.columns.push({
          name: columnName,
          value: columnName,
          type: columns[column] || 'string'
        });
      }
    };

    return Filter;
  }(CriteriaBuilder), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_dec3], {
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
  })), _class2)) || _class) || _class);
});