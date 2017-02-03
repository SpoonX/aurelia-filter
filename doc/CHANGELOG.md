<a name="2.0.0"></a>
# [2.0.0](https://github.com/SpoonX/aurelia-filter/compare/v1.2.0...v2.0.0) (2017-02-03)


### Bug Fixes

* **project:** make sure criteria matches the selected enum value ([6b2a706](https://github.com/SpoonX/aurelia-filter/commit/6b2a706))
* **project:** use an object as parameter for generateFields ([33be165](https://github.com/SpoonX/aurelia-filter/commit/33be165))


### BREAKING CHANGES

* project: An optional boolean parameter has been added to the
“create” method. This parameter should be set to “true” if you want to
update the criteria object as soon as the new filter block has been
created with a “select” type.
* project: it’s now expecting an object as second parameter for the function generateFields.



<a name="1.2.0"></a>
# [1.2.0](https://github.com/SpoonX/aurelia-filter/compare/v1.1.2...v1.2.0) (2017-01-27)


### Features

* **project:** add support for enumerations ([5f8766b](https://github.com/SpoonX/aurelia-filter/commit/5f8766b))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/SpoonX/aurelia-filter/compare/v1.1.1...v1.1.2) (2017-01-03)


### Bug Fixes

* **project:** decrease debounce on value input element ([833e422](https://github.com/SpoonX/aurelia-filter/commit/833e422))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/SpoonX/aurelia-filter/compare/v1.1.0...v1.1.1) (2016-12-08)


### Bug Fixes

* **criteria:** check on element value, not on (alias) name ([c169663](https://github.com/SpoonX/aurelia-filter/commit/c169663))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/SpoonX/aurelia-filter/compare/v1.0.2...v1.1.0) (2016-11-07)


### Features

* **project:** convert datetime to datetime-local, add input validation ([b94d70a](https://github.com/SpoonX/aurelia-filter/commit/b94d70a))



<a name="1.0.2"></a>
## [1.0.2](https://github.com/SpoonX/aurelia-filter/compare/1.0.1...v1.0.2) (2016-11-03)


### Bug Fixes

* **criteria:** check for invalid attributes ([941f11b](https://github.com/SpoonX/aurelia-filter/commit/941f11b))
* **criteria:** determine input type when given a criteria ([b173059](https://github.com/SpoonX/aurelia-filter/commit/b173059))


### Features

* **exclude:** Exclude column not based on association ([7a503f7](https://github.com/SpoonX/aurelia-filter/commit/7a503f7))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/SpoonX/aurelia-filter/compare/0.0.6...v1.0.1) (2016-10-05)


<a name="1.0.0"></a>
# 1.0.0 (2016-08-23)


### Features

* **columns:** option to filter on ids ([6e7ee3b](https://github.com/SpoonX/aurelia-filter/commit/6e7ee3b))


<a name="0.0.6"></a>
## 0.0.6 (2016-08-08)


### Bug Fixes

* **styling:** fix styling ([9210ef3](https://github.com/SpoonX/aurelia-filter/commit/9210ef3))


### Features

* **exclude:** exclude columns from entity ([0075050](https://github.com/SpoonX/aurelia-filter/commit/0075050))
* **project:** ability to ignore entire association ([97953f4](https://github.com/SpoonX/aurelia-filter/commit/97953f4))


<a name="0.0.5"></a>
## 0.0.5 (2016-08-01)


### Bug Fixes

* **build:** add criteriaBuilder to build ([de562eb](https://github.com/SpoonX/aurelia-filter/commit/de562eb))


<a name="0.0.4"></a>
## 0.0.4 (2016-08-01)


### Bug Fixes

* **build:** don't concat components ([22cae5f](https://github.com/SpoonX/aurelia-filter/commit/22cae5f))


<a name="0.0.3"></a>
## 0.0.3 (2016-07-29)


### Bug Fixes

* **project:** do not add column id ([5a29cf4](https://github.com/SpoonX/aurelia-filter/commit/5a29cf4))
* **project:** do not override current sort criteria ([bfbc409](https://github.com/SpoonX/aurelia-filter/commit/bfbc409))
* **project:** handle value type ([6c63065](https://github.com/SpoonX/aurelia-filter/commit/6c63065))
* **project:** make it possible to filter on id ([bd9f67b](https://github.com/SpoonX/aurelia-filter/commit/bd9f67b))


### Features

* **project:** handle predefined values ([710b169](https://github.com/SpoonX/aurelia-filter/commit/710b169))
* **project:** new build tasks with typings and bundled ([5b4aa11](https://github.com/SpoonX/aurelia-filter/commit/5b4aa11))
