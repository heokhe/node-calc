const fact = require('./factorial');
const trigonometric = require('./trigonometric');

module.exports = {
  ...trigonometric,
  cbrt: Math.cbrt,
  sqrt: Math.sqrt,
  abs: Math.abs,
  fact
};
