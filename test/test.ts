import index from '../src/index';

const layerify = index;

test('null', () => {
  expect(layerify(null)).toBe(null);
});

test('not nested', () => {
  const d = {
    a: 1,
    b: 2,
  };
  expect(layerify(d)).toEqual(d);
});

test('nested', () => {
  const d = {
    a: 1,
    b: 2,
    c__x: 1,
    d__y__n: 1,
    d__y__m: 2,
  };
  expect(layerify(d)).toEqual({
    a: 1,
    b: 2,
    c: {
      x: 1,
    },
    d: {
      y: {
        n: 1,
        m: 2,
      },
    },
  });
});

test('ignore null or undefined', () => {
  const d = {
    a: 1,
    b: 2,
    c__x: void 0,
    d__y__n: null,
    d__y__m: null,
  };
  expect(layerify(d)).toEqual({ a: 1, b: 2 });
});

test('array', () => {
  const arr = [
    {
      a: 1,
      b: 2,
      x: null,
    },
    {
      c: 3,
      d__e: 1,
      d__f: 2,
      d__y: void 0,
    },
  ];
  expect(layerify(arr)).toEqual([
    {
      a: 1,
      b: 2,
    },
    {
      c: 3,
      d: {
        e: 1,
        f: 2,
      },
    },
  ]);
});
