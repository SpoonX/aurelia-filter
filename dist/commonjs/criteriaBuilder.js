'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CriteriaBuilder = undefined;

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }



var CriteriaBuilder = exports.CriteriaBuilder = function () {
  function CriteriaBuilder() {
    
  }

  CriteriaBuilder.prototype.updateCriteria = function updateCriteria() {
    var _this = this;

    var blocks = [];

    this.populate = [];

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

    this.criteria = Object.assign(criteriaWhere, { sort: currentSort, populate: this.populate.join(',') });
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
    var _fieldName$, _ref4;

    fieldName = fieldName.split('.');

    if (fieldName.length === 1) {
      var _ref3;

      return _ref3 = {}, _ref3[fieldName[0]] = data, _ref3;
    }

    if (this.populate.indexOf(fieldName[0]) < 0) {
      this.populate.push(fieldName[0]);
    }

    return _ref4 = {}, _ref4[fieldName[0]] = (_fieldName$ = {}, _fieldName$[fieldName[1]] = data, _fieldName$), _ref4;
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