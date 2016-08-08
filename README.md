# aurelia-filter
A plugin for aurelia to populate search/filter criteria. Works well with [aurelia-orm](http://aurelia-orm.spoonx.org) and [aurelia-datatable](http://aurelia-datatable.spoonx.org)

Features:

* Conditional `AND` and `OR` blocks
* Dynamic input type casting
* All [sailsJS](http://sailsjs.org/documentation/concepts/models-and-orm/query-language) operators
* [ORM entities](http://aurelia-orm.spoonx.org/api_entity.html)
* And more

## Installation

### Jspm/SytemJs

Run `jspm i aurelia-filter` from your project root.

### Webpack

Run `npm i aurelia-filter --save` from your project root.

## Documentation

You can find usage examples and the documentation [here](http://aurelia-filter.spoonx.org/).

The [changelog](doc/CHANGELOG.md) provides you with information about important changes.

## Example
 
Here's a snippet to give you an idea of what this module supports.

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

or:

```js
this.userEntity = entityManager.getEntity('users');
```

```html
<filter entity.bind="userEntity" criteria.bind="criteria" exclude-columns="password, createdAt"></filter>
```
