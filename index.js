const layerify = function (obj, sep='__') {
  let ret = {};
  for (let k in obj) {
    if (obj.hasOwnProperty(k)) {
      if (obj[k] === null || obj[k] === void 0) {
        continue;
      }
      let t = k.split(sep);
      let groups = t.slice(0, -1);
      let field = t[t.length - 1];
      let d = ret;
      for (let group of groups) {
        d[group] = d[group] || {};
        d = d[group];
      }
      d[field] = obj[k];
    }
  }
  return ret;
};

export default layerify;

