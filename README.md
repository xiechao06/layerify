# layerify [homepage](https:///xiechao06.github.io/layerify)

[![npm](https://img.shields.io/npm/v/layerify.svg?style=flat-square)](https://www.npmjs.org/package/layerify)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Travis CI](https://img.shields.io/travis/xiechao06/layerify.svg?style=flat-square)](https://travis-ci.ors/xiechao06/layerify)
[![GitHub](https://img.shields.io/github/issues/xiechao06/layerify.svg?style=flat-square)](https://github.com/xiechao06/layerify/issues)
[![David](https://img.shields.io/david/xiechao06/layerify.svg?style=flat-square)](https://david-dm.org/xiechao06/layerify)
[![Coveralls](https://img.shields.io/coveralls/xiechao06/layerify.svg?style=flat-square)](https://coveralls.io/r/xiechao06/layerify)
[![Greenkeeper badge](https://badges.greenkeeper.io/xiechao06/layerify.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Type definitions](https://img.shields.io/npm/types/typescript.svg)](https://www.typescriptlang.org/)
[![Known Vulnerabilities](https://snyk.io/test/github/xiechao06/layerify/badge.svg?targetFile=package.json)](https://snyk.io/test/github/xiechao06/layerify?targetFile=package.json)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![manpm](https://img.shields.io/badge/manpm-compatible-3399ff.svg)](https://github.com/bahmutov/manpm)


make an un-nested object into a nested object by object keys

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

I prefer to use query builders like [knex](https://knexjs.org) rather than ORMs like [bookshelf](https://bookshelfjs.org/), because they are more explicit and
still you could get validations compared to writing plain sql.

But it is a headache to write a bunch of mess like:

```javascript
async function getUser (id) {
  let [user] = await db('users')
    .join('departments', 'users.department_id', 'departments.id')
    .select(
      'users.*',
      'departments.id as departmentId',
      'departments.name as departmentName'
    )
    .where('users.id', id)
  user = {
    id: user.id
    name: user.name,
    department: {
      id: user.departmentId,
      name: user.departmentName
    }
  }
  return user
}
```

I still need a way to make joined-query elegantly. so I make this utility library. So the aforementioned codes could be written as:

```javascript
async function getUser (id) {
  let [user] = await db('users')
    .join('departments', 'users.department_id', 'departments.id')
    .select(
      'users.*',
      // assume departments is an object that defines the schema
      Object.keys(departments).map(k => `department.${k} as department__${k}`)
    )
    .where('users.id', id)
  return layerify(user)
}
```


## Installation

```bash
npm i layerify
```

## Basic Usage

```javascript
const layerify = require('layerify') // or import layerify from 'layerify'

layerify({
  a: 1,
  b__a: 2,
}) // { a: 1, b: { a: 2 } }

layerify([{
  a: 1,
  b__a: 2,
}, {
  c__a: 3
}]) // [{ a: 1, b: { a: 2 } }, { c: { a: 3 } }]

```

check [test/test.js](https://github.com/xiechao06/layerify/blob/master/test/test.js) for more examples.

## See also

* [knex-pg-builder](https://www.npmjs.com/package/knex-pg-builder)


## Development

```bash
git clone https://github.com/xiechao06/layerify
cd layerify
npm test
npm test:watch
npm build
npm deploy:doc # deploy gh-pages
```

## Documentation

[docs](https:///xiechao06.github.io/layerify)

## License

MIT © xiechao <<xiechao06@gmail.com>>


[npm-image]: https://badge.fury.io/js/layerify.svg
[npm-url]: https://npmjs.org/package/layerify
[travis-image]: https://travis-ci.org/xiechao06/layerify.svg?branch=master
[travis-url]: https://travis-ci.org/xiechao06/layerify
[daviddm-image]: https://david-dm.org/xiechao06/layerify.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/xiechao06/layerify
[coveralls-image]: https://coveralls.io/repos/xiechao06/layerify/badge.svg
[coveralls-url]: https://coveralls.io/r/xiechao06/layerify
[license-mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-mit]: https://opensource.org/licenses/MIT
[issue-image]: https://img.shields.io/github/issues-raw/xiechao06/layerify.svg
[issue-url]: https://github.com/xiechao06/layerify
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[commitizen-friendly-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-friendly-url]: http://commitizen.github.io/cz-cli/
[type-definitions-image]: https://img.shields.io/npm/types/layerify.svg
[type-definitions-url]: https://www.typescriptlang.org/
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[manpm-image]: https://img.shields.io/badge/manpm-compatible-3399ff.svg
[manpm-url]: https://github.com/bahmutov/manpm
