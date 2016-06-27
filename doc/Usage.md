# Usage

```js
@bindable columns = [
  {name : "id",         value: "id",        type: 'number'},
  {name : "Name",       value: "name",      type: 'text'},
  {name : "Created at", value: "createdAt", type: 'date'}
];
```

```html
<filter columns.bind="columns" criteria.bind="criteria"></filter>
```

## Attributes

### columns
An array with objects containing the `name` and `value`. If no `type` is given it will assume that the column is a `text`.

Read me about [types](http://aurelia-form.spoonx.org/types.html).

### entity
When given an entity, the filter will determine the columns based on the entity.

This is as simple as `EntityManager.getEntity('resource')`. *[More information](http://aurelia-orm.spoonx.org/api_entity.html)*.

If you don't use the `@type` decorator it will assume that the column is `text`.

### criteria
The generated criteria object. Use this object to query your application.

## Changing framework
You can override the framework used for the filter with any of the [supported ones](https://github.com/SpoonX/aurelia-filter/tree/master/src) using the [aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).
