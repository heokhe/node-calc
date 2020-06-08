const factMap = new Map([[0, 1]]);

function fact(x) {
  if (x % 1 !== 0 || x < 0) throw new TypeError('fact(x) only accepts non-negative integers');
  if (factMap.has(x)) return factMap.get(x);

  const y = x * fact(x - 1);
  factMap.set(x, y);
  return y;
}

factMap.set(5, fact(5));

module.exports = fact;
