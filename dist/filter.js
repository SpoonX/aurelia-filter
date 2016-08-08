import {customElement, bindable, bindingMode} from 'aurelia-framework';
import {resolvedView}                         from 'aurelia-view-manager';
import {CriteriaBuilder}                      from './criteriaBuilder';

@customElement('filter')
@resolvedView('spoonx/filter', 'filter')
export class Filter extends CriteriaBuilder {
  @bindable({defaultBindingMode: bindingMode.twoWay}) criteria = {};
  @bindable columns                                            = [];
  @bindable entity                                             = null;
  @bindable excludeColumns;

  filters      = [];
  fieldElement = {
    key: 'field',
    type: 'select',
    label: false,
    options: []
  };

  operatorElement = {
    key: 'operator',
    type: 'select',
    label: false,
    options: [
      {name: 'equals', value: 'equals'},
      {name: 'not equals', value: 'not'},
      {name: 'in', value: 'in'},
      {name: 'not in', value: '!'},
      {name: 'contains', value: 'contains'},
      {name: 'begins with', value: 'startsWith'},
      {name: 'ends with', value: 'endsWith'},
      {name: 'between', value: 'between'},
      {name: 'greater than', value: 'greaterThan'},
      {name: 'less than', value: 'lessThan'},
      {name: 'less or equal than', value: 'lessThanOrEqual'},
      {name: 'greater or equal than', value: 'greaterThanOrEqual'}
    ]
  };

  valueElement = {
    key: 'value',
    type: 'string',
    label: false,
    attributes: {
      style: 'margin-bottom: 0' // button group styling issue
    }
  };

  constructor() {
    super();
  }

  attached() {
    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    // Do we need to set pre-defined values for the filter?
    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      return this.parseCriteria(this.criteria.where);
    }

    this.valueElement.type = this.columns[0].type || 'string'; // set the initial valueElement `type`
    this.create();
  }

  parseCriteria(criteriaWhere) {
    let data = {};

    if (criteriaWhere.or) {
      criteriaWhere.or.forEach((block, i) => {
        Object.keys(block).forEach((field) => {
          data = Object.assign(this.buildFieldData(block[field]), {field: field});
          if (!this.filters[i]) {
            // create a new block
            return this.create(undefined, data);
          }

          // Add AND condition to the current block
          this.create(i, data);
        });
      });

      return;
    }

    Object.keys(criteriaWhere).forEach((field, i) => {
      data = Object.assign(this.buildFieldData(criteriaWhere[field]), {field: field});
      if (i === 0) {
        // create the first block
        return this.create(undefined, data);
      }

      // Add AND condition to the first block
      this.create(0, data);
    });
  }

  buildFieldData(field) {
    if (typeof field === 'string') {
      return {operator: 'equals', value: field};
    }

    if (Array.isArray(field)) {
      return {operator: 'in', value: field.join()};
    }

    if (Object.keys(field).length > 1) {
      return {operator: 'between', value: field['>='], between: field['<=']};
    }

    let key = Object.keys(field)[0];

    if (Array.isArray(field[key])) {
      // not-in
      return {operator: '!', value: field[key].join()};
    }

    return {operator: key, value: field[key]};
  }

  create(blockIndex, data) {
    let filter = {
      field: this.fieldElement,
      operator: this.operatorElement,
      value: Object.create(this.valueElement),
      data: data || {}
    };

    // create filter
    if (typeof blockIndex !== 'undefined') {
      return this.filters[blockIndex].push(filter);
    }

    // create block
    this.filters.push([filter]);
  }

  destroy(blockIndex, index) {
    // destroy block
    if (typeof index === 'undefined') {
      this.filters.splice(blockIndex, 1);
      this.updateCriteria();

      return;
    }

    // destroy filter within a block
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

    // change the input type of the `valueElement` based on the selected field
    for (let field of this.columns) {
      if (this.filters[blockIndex][index].data.field === field.value) {
        this.filters[blockIndex][index].value.type = field.type || 'string';

        break;
      }
    }
  }

  getEntityFields() {
    let metaData = this.entity.getMeta().metadata;
    let columns  = metaData.types;

    // no types given in entity, fetch them all as `type` string
    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns);

    if (Object.keys(metaData.associations).length < 1) {
      return;
    }

    // get the columns of the entity associations
    let repositories = this.entity.getRepository().entityManager.repositories;
    for (let association in metaData.associations) {
      let entityName = metaData.associations[association].entity;

      if (!repositories[entityName]) {
        return;
      }

      let repoData = repositories[entityName].getMeta().metadata.types; // no `asObject` method available

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, entityName);
    }
  }

  generateFields(columns, entityName) {
    let excludeColumns = (this.excludeColumns) ? this.excludeColumns.replace(/\s/g, '').split(',') : [];

    for (let column in columns) {
      let columnName = (entityName) ? entityName + '.' + column : column;

      // ignore entire or part of a association
      if (excludeColumns.indexOf(entityName) > -1 || excludeColumns.indexOf(columnName) > -1) {
        continue;
      }

      this.columns.push({
        name: columnName,
        value: columnName,
        type: columns[column] || 'string'
      });
    }
  }
}
