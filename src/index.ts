/**
 * layerify an object
 *
 * @param obj object to be layerified
 * @param sep seperator that denotes there should be another layer
 */
const layerifyObj = (obj: object | null, sep: string = '__') => {
  if (obj == null) {
    return obj;
  }
  const ret = {};
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      if ((obj as any)[k] === null || (obj as any)[k] === void 0) {
        continue;
      }
      const t = k.split(sep);
      const groups = t.slice(0, -1);
      const field = t[t.length - 1];
      let d = ret as any;
      for (const group of groups) {
        d[group] = d[group] || {};
        d = d[group];
      }
      d[field] = (obj as any)[k];
    }
  }
  return ret;
};

/**
 * layerify an object or array of object
 *
 * @param obj object/array to be layerified
 * @param sep seperator that denotes there should be another layer
 */
const layerify = (o: object | object[] | null, sep: string = '__') => {
  if (Array.isArray(o)) {
    return o.map((it) => layerifyObj(it, sep));
  }
  return layerifyObj(o, sep);
};

export default layerify;
