const { Token } = require('./tokens');
const tokenize = require('./tokenize');

/** @param {string} expr */
function evalExpression(expr) {
  expr = expr
    .replace(/\((.+)\)/g, (_, innerValue) => evalExpression(innerValue));

  const tokens = tokenize(expr);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (!token.isOperator || !token.hasHighPriority) continue;

    const prev = tokens[i - 1],
      next = tokens[i + 1],
      value = token.perform(prev.value, next.value);
    tokens.splice(i - 1, 3, new Token(value.toString()));
    i = 0;
  }
  let x,
    operator,
    prev;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isOperator) {
      prev = operator ? operator.perform(prev, x.value) : x.value;
      operator = token;
      x = undefined;
    } else {
      x = token;
    }
  }
  return operator ? operator.perform(prev, x.value) : x.value;
}

module.exports = evalExpression;
