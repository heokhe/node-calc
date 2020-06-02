const { Token, Parenthesis } = require('./tokens');
const tokenize = require('./tokenize');

function solveParenthesis(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token instanceof Parenthesis) {
      // eslint-disable-next-line no-use-before-define
      let innerValue = evalExpression(token.innerValue);
      if (token.isNegative) innerValue *= -1;
      tokens[i] = new Token(innerValue.toString());
    }
  }
}

function solvePowers(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.isOperator && token.priority === 3) {
      const prev = tokens[i - 1],
        next = tokens[i + 1],
        value = token.perform(prev.value, next.value);
      tokens.splice(i - 1, 3, new Token(value.toString(), next.value % 2 === 0 && prev.isNegative));
      i = tokens.length - 1;
    }
  }
}

function solveOpsWithProriorityOf2(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isOperator && token.priority === 2) {
      const prev = tokens[i - 1],
        next = tokens[i + 1],
        value = token.perform(prev.value, next.value);
      tokens.splice(i - 1, 3, new Token(value.toString()));
      i = 0;
    }
  }
}

function evalTokens(tokens) {
  if (!tokens.length) throw new Error('no tokens');

  solveParenthesis(tokens);
  solvePowers(tokens);
  solveOpsWithProriorityOf2(tokens);

  let next,
    operator,
    prev;
  for (const token of tokens) {
    if (token.isOperator) {
      prev = operator ? operator.perform(prev, next) : next;
      operator = token;
      next = undefined;
    } else next = token.value;
  }
  return operator ? operator.perform(prev, next) : next;
}

/** @param {string} expr */
function evalExpression(expr) {
  if (!expr.trim()) throw new Error('no expression');
  return evalTokens(tokenize(expr));
}

module.exports = { evalExpression, evalTokens };
