const getPow = x => {
  x = x % 1;
  let p = 1;
  while (x % 1 !== 0) {
    p *= 10;
    x *= 10;
  }
  return p;
};
const getMaxPow = (a, b) => Math.max(getPow(a), getPow(b));

function add(a, b) {
  const t = getMaxPow(a, b);
  return (t * a + t * b) / t;
}

function sub(a, b) {
  const t = getMaxPow(a, b);
  return (t * a - t * b) / t;
}

function mul(a, b) {
  const t = getMaxPow(a, b);
  return (t * a * t * b) / t / t;
}

function div(a, b) {
  const t = getMaxPow(a, b);
  return (t * a) / (t * b);
}

// eslint-disable-next-line object-curly-newline
module.exports = { add, sub, mul, div };
