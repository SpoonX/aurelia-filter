# Archived

It was fun while it lasted, but we have to stop maintaining these repositories. We haven't used these projects for quite some time and maintaining them is becoming harder to do.

You deserve better, and for that reason we've decided to archive some repositories, which includes this one.

Feel free to fork and alter the repositories, and go forth making awesome stuff.

# aurelia-filter

[![Build Status](https://travis-ci.org/SpoonX/aurelia-filter.svg)](https://travis-ci.org/SpoonX/aurelia-filter)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

A plugin for aurelia to populate search/filter criteria. Works well with [aurelia-orm](http://aurelia-orm.spoonx.org) and [aurelia-filter](http://aurelia-filter.spoonx.org)

Features:

* Conditional `AND` and `OR` blocks
* Dynamic input type casting
* All [sailsJS](http://sailsjs.org/documentation/concepts/models-and-orm/query-language) operators
* [ORM entities](http://aurelia-orm.spoonx.org/api_entity.html)
* And more

## Breaking changes

v3.0 of aurelia-filter uses the latest version of aurelia-form.

## Uses

aurelia-filter needs following plugins installed and configured:

* [aurelia-form](https://www.npmjs.com/package/aurelia-form)
* [aurelia-view-manager](https://www.npmjs.com/package/aurelia-view-manager)

## Documentation

You can find usage examples and the documentation [here](http://aurelia-filter.spoonx.org/).

The [changelog](doc/CHANGELOG.md) provides you with information about important changes.

## Example

Here's a snippet to give you an idea of what this module supports.

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

or:

```js
this.userEntity = entityManager.getEntity('users');
```

```html
<filter entity.bind="userEntity" criteria.bind="criteria" exclude-columns="password, createdAt"></filter>
```

## Installation

### Aureli-Cli

Run `npm i aurelia-filter --save` from your project root.

Aurelia-filter uses `extend`, soa add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

```js
"dependencies": [
  "extend",
  {
    "name": "aurelia-filter",
    "path": "../node_modules/aurelia-filter/dist/amd",
    "main": "aurelia-filter",
    "resources": [
      "bootstrap/filter.html"
    ]
  },
  // ...
],
```

### Jspm

Run `jspm i aurelia-filter` from your project root.

Aurelia-filter uses `extend`, so add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
  "extend",
  "aurelia-filter",
  "[aurelia-filter/**/*.js]",
  "aurelia-filter/**/*.html!text",
```

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-filter --save` from your project root.

And add `aurelia-filter` in the `coreBundles.aurelia` section of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-filter` or add `"aurelia-filter": "github:spoonx/aurelia-filter",` to your `typings.json` and run `typings i`.
