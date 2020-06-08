const fact = require('./factorial');

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
  fact
};
