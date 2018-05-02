const assert = require('assert');
const layerify = require('./build/index.cjs.js');

describe('not nested', function() {
  let d = {
    a: 1,
    b: 2,
  };
  assert.deepEqual(d, layerify(d));
});

describe('nested', function() {
  let d = {
    a: 1,
    b: 2,
    c__x: 1,
    d__y__n: 1,
    d__y__m: 2
  };
  assert.deepEqual({
    a: 1,
    b: 2,
    c: {
      x: 1,
    },
    d: {
      y: {
        n: 1,
        m: 2
      }
    }
  }, layerify(d));
});


describe('ignore null or undefined', function() {
  let d = {
    a: 1,
    b: 2,
    c__x: void 0,
    d__y__n: null,
    d__y__m: null,
  };
  assert.deepEqual({
    a: 1,
    b: 2,
  }, layerify(d));
});
