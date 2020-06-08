const degToRad = x => (x % 360) * Math.PI / 180;

module.exports = {
  sin(x) {
    return Math.sin(degToRad(x));
  },
  cos(x) {
    return Math.cos(degToRad(x));
  },
  tan(x) {
    return Math.tan(degToRad(x));
  },
  cot(x) {
    return 1 / Math.tan(degToRad(x));
  },
  cbrt(x) {
    return Math.cbrt(x);
  },
  sqrt(x) {
    return Math.sqrt(x);
  },
  fact(x) {
    if (x % 1 !== 0 || x < 0) throw new TypeError('fact(x) only accepts non-negative integers');
    let y = 1;
    for (let i = x; i > 1; i--) y *= i;
    return y;
  }
};
