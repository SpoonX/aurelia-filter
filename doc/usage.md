# Usage

```js
@bindable columns = [
  {name : "id",         value: "id",        type: 'number'},
  {name : "Name",       value: "name",      type: 'text'},
  {name : "Created at", value: "createdAt", type: 'date'},
  // For enumeration
  {name : "State", value: "state", type: 'select'}
];
```

```html
<filter columns.bind="columns" criteria.bind="criteria"></filter>
```

## Attributes

### columns
An array with objects containing the `name` and `value`. If no `type` is given it will assume that the column is a `text`.

When the given `type` is a `datetime`, `datetime-local` will be used instead because `datetime` is not supported by browsers.

When the given `type` is a `select`, we assume the given column is an enumeration. Thus we will generate the options for the select element based on the enum values of the entity.

When the input value is invalid, for example with `datetime-local`, it will add the `has-error` class to the input. (styled default by bootstrap)

Read me about [types](http://aurelia-form.spoonx.org/types.html).

### entity
When given an entity, the filter will determine the columns based on the entity.

This is as simple as `EntityManager.getEntity('resource')`. *[More information](http://aurelia-orm.spoonx.org/api_entity.html)*.

If you don't use the `@type` decorator it will assume that the column is `text`.

### exclude-columns
When using an entity, you can exclude columns (comma separated) from showing up in the filter. You can exclude entire associations or part of them.

```js
// entity result set
{
    user: {
        username: 'Bob',
        password: 'a78dasd8907asd89a7sd&ASd98a7sd79'
    },
    groups: {
        id  : 1,
        name: 'users'
    },
    createdAt: '2016-01-01'
}
```

```html
<filter exclude-columns="user.password, createdAt, groups"></filter>
```

### criteria
The generated criteria object. Use this object to query your application.

## Changing framework
You can override the framework used for the filter with any of the [supported ones](https://github.com/SpoonX/aurelia-filter/tree/master/src) using the [aurelia-view-manager](https://github.com/spoonx/aurelia-view-manager).
