/* eslint-disable no-use-before-define */

const { Token } = require('./tokens');
const tokenize = require('./tokenize');

function solveFunctions(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === Token.TYPES.FUNCTION) {
      const argValue = evalExpression(token.argumentParenthesis.innerValue);
      tokens[i] = new Token(token.calculate(argValue));
    }
  }
}

function solveParenthesis(tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === Token.TYPES.PARENTHESIS) {
      let innerValue = evalExpression(token.innerValue);
      if (token.isNegative) innerValue *= -1;
      tokens[i] = new Token(innerValue.toString());
    }
  }
}

function solvePowers(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.type === Token.TYPES.OPERATOR && token.priority === 3) {
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
    if (token.type === Token.TYPES.OPERATOR && token.priority === 2) {
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

  solveFunctions(tokens);
  solveParenthesis(tokens);
  solvePowers(tokens);
  solveOpsWithProriorityOf2(tokens);

  let next,
    operator,
    prev;
  for (const token of tokens) {
    if (token.type === Token.TYPES.OPERATOR) {
      prev = operator ? operator.perform(prev, next) : next;
      operator = token;
      next = undefined;
    } else next = token.value;
  }
  return operator ? operator.perform(prev, next) : next;
}

/** @param {string} expr */
function evalExpression(expr) {
  return evalTokens(tokenize(expr));
}

module.exports = { evalExpression, evalTokens };
