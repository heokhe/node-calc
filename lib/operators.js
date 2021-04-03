const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const pow = (a, b) => a ** b;

function div(a, b) {
  if (b === 0) throw new TypeError('can\'t divide by zero');
  return a / b;
}

// eslint-disable-next-line object-curly-newline
module.exports = {
  '+': add,
  '-': sub,
  '*': mul,
  '/': div,
  '^': pow
};
