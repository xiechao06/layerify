# layerify

[![License: MIT][license-mit-image]][license-mit] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Greenkeeper badge](https://badges.greenkeeper.io/xiechao06/layerify.svg)](https://greenkeeper.io/)

[homepage](https:///xiechao06.github.io/layerify)

make an un-nested object into a nested object by object keys

## Motivation

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
