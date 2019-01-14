const assert = require('assert')
const layerify = require('./')

it('not nested', function () {
  let d = {
    a: 1,
    b: 2
  }
  assert.strict.deepEqual(d, layerify(d))
})

it('nested', function () {
  let d = {
    a: 1,
    b: 2,
    c__x: 1,
    d__y__n: 1,
    d__y__m: 2
  }
  assert.strict.deepEqual({
    a: 1,
    b: 2,
    c: {
      x: 1
    },
    d: {
      y: {
        n: 1,
        m: 2
      }
    }
  }, layerify(d))
})

it('ignore null or undefined', function () {
  let d = {
    a: 1,
    b: 2,
    c__x: void 0,
    d__y__n: null,
    d__y__m: null
  }
  assert.strict.deepEqual({
    a: 1,
    b: 2
  }, layerify(d))
})

it('array', function () {
  assert.strict.deepEqual([
    {
      a: 1,
      b: 2
    }, {
      c: 3,
      d: {
        e: 1,
        f: 2
      }
    }
  ], layerify([
    {
      a: 1,
      b: 2,
      x: null
    }, {
      c: 3,
      d__e: 1,
      d__f: 2,
      d__y: void 0
    }
  ]))
})
