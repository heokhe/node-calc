const fact = require('./factorial');
const trigonometric = require('./trigonometric');

module.exports = {
  ...trigonometric,
  ln: Math.log,
  log: Math.log10,
  cbrt: Math.cbrt,
  sqrt: Math.sqrt,
  abs: Math.abs,
  fact
};
