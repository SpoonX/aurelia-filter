import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {resolvedView}                                 from 'aurelia-view-manager';
import {Config as FormConfig}                         from 'aurelia-form';
import {CriteriaBuilder}                              from './criteriaBuilder';

@customElement('filter')
@resolvedView('spoonx/filter', 'filter')
@inject(FormConfig)
export class Filter extends CriteriaBuilder {
  @bindable({defaultBindingMode: bindingMode.twoWay}) criteria = {};
  @bindable columns                                            = [];
  @bindable entity                                             = null;

  filters          = [];
  fieldElement     = {
    key    : 'field',
    type   : 'select',
    label  : false,
    options: []
  };

  operatorElement = {
    key    : 'operator',
    type   : 'select',
    label  : false,
    options: [
      {name: 'equals',                value: 'equals'},
      {name: 'not equals',            value: 'not'},
      {name: 'in',                    value: 'in'},
      {name: 'not in',                value: 'not-in'},
      {name: 'contains',              value: 'contains'},
      {name: 'begins with',           value: 'startsWith'},
      {name: 'ends with',             value: 'endsWith'},
      {name: 'between',               value: 'between'},
      {name: 'greater than',          value: 'greaterThan'},
      {name: 'less than',             value: 'lessThan'},
      {name: 'less or equal than',    value: 'lessThanOrEqual'},
      {name: 'greater or equal than', value: 'greaterThanOrEqual'}
    ]
  };

  valueElement = {
    key       : 'value',
    type      : 'string',
    label     : false,
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
    this.valueElement.type    = this.columns[0].type || 'string'; // set the initial valueElement `type`

    this.create();
  }

  create(blockIndex) {
    let filter = {
      field   : this.fieldElement,
      operator: this.operatorElement,
      value   : Object.create(this.valueElement),
      data    : {}
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
      let repoData   = repositories[entityName].getMeta().metadata.types; // no `asObject` method available

      if (!repoData) {
        continue;
      }

      this.generateFields(repoData, entityName);
    }
  }

  generateFields(columns, entityName) {
    for (let column in columns) {
      let columnName = (entityName) ? entityName + '.' + column : column;

      this.columns.push({
        name  : columnName,
        value : columnName,
        type  : columns[column] || 'string'
      });
    }
  }
}
