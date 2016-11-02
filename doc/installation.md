# Installation

## Uses

Aurelia-filter needs following plugins installed and configured:

* [aurelia-form](https://www.npmjs.com/package/aurelia-form)
* [aurelia-view-manager](https://www.npmjs.com/package/aurelia-view-manager)

## Aureli-Cli

Run `npm i aurelia-filter --save` from your project root.

Aurelia-filter uses `extend`, so add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

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

## Jspm

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

## Webpack

Run `npm i aurelia-filter --save` from your project root.

And add `aurelia-filter` in the `coreBundles.aurelia` section of your `webpack.config.js`.

## Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-filter` or add `"aurelia-filter": "github:spoonx/aurelia-filter",` to your `typings.json` and run `typings i`.
