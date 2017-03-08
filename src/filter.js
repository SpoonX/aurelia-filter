import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {resolvedView}                         from 'aurelia-view-manager';
import {CriteriaBuilder}                      from './criteriaBuilder';
import {Configuration}                        from 'aurelia-config';

@customElement('filter')
@resolvedView('spoonx/filter', 'filter')
@inject(Configuration.of('aurelia-filter'))
export class Filter extends CriteriaBuilder {
  @bindable({defaultBindingMode: bindingMode.twoWay}) criteria = {};
  @bindable columns                                            = [];
  @bindable entity                                             = null;
  @bindable showIdColumns                                      = true;
  @bindable excludeColumns;

  filters           = [];
  fieldTypes        = [];
  fieldEnumerations = {};

  fieldElement = {
    key    : 'field',
    type   : 'select',
    label  : false,
    options: []
  };

  operatorElement = {
    key    : 'operator',
    type   : 'select',
    label  : false,
    options: []
  };

  valueElement = {
    key       : 'value',
    type      : 'string',
    label     : false,
    attributes: {
      style: 'margin-bottom: 0' // button group styling issue
    }
  };

  constructor(config) {
    super();
    this.operatorElement.options = config.operatorOptions;
  }

  attached() {
    if (this.entity) {
      this.getEntityFields();
    }

    this.fieldElement.options = this.columns;

    //eslint-disable-next-line array-callback-return
    this.fieldElement.options.map(filter => {
      this.fieldTypes[filter.value] = (filter.type === 'datetime') ? 'datetime-local' : filter.type;

      if (filter.type === 'select') {
        this.fieldEnumerations[filter.value] = filter.options || [];
      }
    });

    // Do we need to set pre-defined values for the filter?
    if (this.criteria.where && Object.keys(this.criteria.where).length) {
      this.parseCriteria(this.criteria.where);

      // check if parseCriteria added a valid filter, otherwise create a empty one
      if (this.filters.length > 0) {
        return;
      }
    }

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
            return this.create(undefined, data, true);
          }

          // Add AND condition to the current block
          this.create(i, data, true);
        });
      });

      return;
    }

    Object.keys(criteriaWhere).forEach((field, i) => {
      data = Object.assign(this.buildFieldData(criteriaWhere[field]), {field: field});

      if (i === 0) {
        // create the first block
        return this.create(undefined, data, true);
      }

      // Add AND condition to the first block
      this.create(0, data, true);
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

  create(blockIndex, data, skipOnChange) {
    // prevent adding a non-existing field to the filter (leads to selecting the wrong field in the dropdown)
    if (data && data.field) {
      let options = this.fieldElement.options.map(option => option.value);

      if (options.indexOf(data.field) < 0) {
        return;
      }
    }

    // determine the `type` of the field
    let valueElement  = Object.create(this.valueElement);
    let fieldName     = data ? data.field : this.columns[0].value;

    valueElement.type = this.fieldTypes[fieldName] || 'string';

    if (valueElement.type === 'select') {
      if (!skipOnChange) {
        data = {
          field   : fieldName,
          value   : this.fieldEnumerations[fieldName][0],
          operator: this.operatorElement.options[0].value
        };
      }

      valueElement.options = this.fieldEnumerations[fieldName];
    }

    let filter = {
      field   : this.fieldElement,
      operator: this.operatorElement,
      value   : valueElement,
      data    : data || {}
    };

    // create filter
    if (typeof blockIndex !== 'undefined') {
      this.filters[blockIndex].push(filter);
      if (!skipOnChange && valueElement.type === 'select') {
        this.onChange(blockIndex, this.filters[blockIndex].length -1, true);
      }

      return;
    }

    // create block
    this.filters.push([filter]);

    if (!skipOnChange && valueElement.type === 'select') {
      this.onChange(this.filters.length -1, 0, true);
    }
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
    let filterValue = this.filters[blockIndex][index].data.value;

    if (isValue && (filterValue === '' || filterValue === undefined)) {
      this.filters[blockIndex][index].data.hasError = true;

      return;
    }

    this.filters[blockIndex][index].data.hasError = false;

    if (typeof filterValue !== 'undefined') {
      this.updateCriteria();
    }

    // prevent updating own `type`
    if (isValue) {
      return;
    }

    // change the input type of the `valueElement` based on the selected field
    for (let field of this.columns) {
      if (this.filters[blockIndex][index].data.field === field.value) {
        let type = (field.type === 'datetime') ? 'datetime-local' : field.type;

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
    let columns  = metaData.types;

    // no types given in entity, fetch them all as `type` string
    if (!columns) {
      columns = this.entity.asObject();
    }

    this.generateFields(columns, {metaData});

    if (Object.keys(metaData.associations).length < 1) {
      return;
    }

    // get the columns of the entity associations
    let repositories = this.entity.getRepository().entityManager.repositories;

    for (let association in metaData.associations) {
      if (!metaData.associations.hasOwnProperty(association)) {
        continue;
      }

      let entityName = metaData.associations[association].entity;

      if (!repositories[entityName]) {
        return;
      }

      let repoData = repositories[entityName].getMeta().metadata.types; // no `asObject` method available

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, {entityName});
    }
  }

  generateFields(columns, {entityName, metaData} = {}) {
    let excludeColumns = (this.excludeColumns) ? this.excludeColumns.replace(/\s/g, '').split(',') : [];

    if (this.showIdColumns) {
      columns.id = 'number';
    }

    for (let column in columns) {
      if (!columns.hasOwnProperty(column)) {
        continue;
      }

      let columnName = (entityName) ? entityName + '.' + column : column;

      // ignore entire or part of a association OR specific field(s)
      if ((entityName && excludeColumns.indexOf(entityName) > -1) || excludeColumns.indexOf(columnName) > -1) {
        continue;
      }

      let filterColumn = {
        name : columnName,
        value: columnName,
        type : columns[column] || 'string'
      };

      if (metaData.enumerations && column in metaData.enumerations) {
        filterColumn.type    = 'select';
        filterColumn.options = metaData.enumerations[column];
      }

      this.columns.push(filterColumn);
    }
  }
}
