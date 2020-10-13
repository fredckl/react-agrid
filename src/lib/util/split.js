export const splitBy = (ns, list) => {
  var result = [];
  var idx = 0;
  var count = 0;
  while (idx < list.length) {
    const s = ns[count++] || list.length;
    result.push(list.slice(idx, idx += s));
  };
  return result;
};