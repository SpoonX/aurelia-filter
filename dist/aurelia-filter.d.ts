import {Config,resolvedView} from 'aurelia-view-manager';
import {inject,customElement,bindable,bindingMode} from 'aurelia-framework';
import {Configuration} from 'aurelia-config';

export declare function configure(aurelia?: any): any;
export declare const config: any;
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
  fieldEnumerations: any;
  fieldElement: any;
  operatorElement: any;
  valueElement: any;
  constructor(config?: any);
  attached(): any;
  parseCriteria(criteriaWhere?: any): any;
  buildFieldData(field?: any): any;
  create(blockIndex?: any, data?: any, skipOnChange?: any): any;
  destroy(blockIndex?: any, index?: any): any;
  onChange(blockIndex?: any, index?: any, isValue?: any): any;
  getEntityFields(): any;
  generateFields(columns?: any, {
    entityName,
    metaData
  }?: {
    entityName?: any,
    metaData?: any
  }): any;
}