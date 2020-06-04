const getMaxPow = (a, b) => Math.max(
  (a.toString().split('.')[1] || '').length,
  (b.toString().split('.')[1] || '').length
);

function add(a, b) {
  const t = 10 ** getMaxPow(a, b);
  return (t * a + t * b) / t;
}

function sub(a, b) {
  const t = 10 ** getMaxPow(a, b);
  return (t * a - t * b) / t;
}

function mul(a, b) {
  const t = 10 ** getMaxPow(a, b);
  return (t * a * t * b) / t / t;
}

function div(a, b) {
  const t = 10 ** getMaxPow(a, b);
  return (t * a) / (t * b);
}

// eslint-disable-next-line object-curly-newline
module.exports = { add, sub, mul, div };
