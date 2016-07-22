import extend from 'extend';

export class CriteriaBuilder {

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

    let currentSort = this.criteria.sort || {};
    this.criteria   = (blocks.length > 1) ? {where: {or: blocks}, sort: currentSort} : {where: blocks[0], sort : currentSort};
  }

  parseOperator(filter) {
    switch(filter.operator) {
      case 'equals':
          return filter.value;
      case 'between':
        return this.parseBetween(filter);
      case 'in':
        return this.toArray(filter.value);
      case '!':
        // not-in
        filter.operator = '!';
        filter.value    = this.toArray(filter.value);
      default:
        return {[filter.operator]: filter.value};
    }
  }

  parseBetween(data, valueOperator = '>=', betweenOperator = '<=') {
    if (!this.hasValue(data.between)) {
      return;
    }

    return {
      [valueOperator]  : data.value,
      [betweenOperator]: data.between
    };
  }

  parseField(fieldName, data) {
    var fieldName = fieldName.split('.');

    if (fieldName.length > 1) {
      return {[fieldName[0]]: {[fieldName[1]]: data}};
    }

    return {[fieldName[0]]: data};
  }

  toArray(value) {
    return value.split(',').map(i => {
      return i.trim();
    });
  }

  hasValue(value) {
    return typeof value !== 'undefined' && value !== '';
  }
}
