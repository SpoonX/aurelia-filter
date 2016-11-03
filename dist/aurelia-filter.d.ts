import {Config,resolvedView} from 'aurelia-view-manager';
import {customElement,bindable,bindingMode} from 'aurelia-framework';

export declare function configure(aurelia?: any): any;
export declare class CriteriaBuilder {
  updateCriteria(): any;
  parseOperator(filter?: any): any;
  parseBetween(data?: any, valueOperator?: any, betweenOperator?: any): any;
  parseField(fieldName?: any, data?: any): any;
  toArray(value?: any): any;
  hasValue(value?: any): any;
}
export declare class Filter extends CriteriaBuilder {
  criteria: any;
  columns: any;
  entity: any;
  showIdColumns: any;
  excludeColumns: any;
  filters: any;
  fieldTypes: any;
  fieldElement: any;
  operatorElement: any;
  valueElement: any;
  attached(): any;
  parseCriteria(criteriaWhere?: any): any;
  buildFieldData(field?: any): any;
  create(blockIndex?: any, data?: any): any;
  destroy(blockIndex?: any, index?: any): any;
  onChange(blockIndex?: any, index?: any, isValue?: any): any;
  getEntityFields(): any;
  generateFields(columns?: any, entityName?: any): any;
}