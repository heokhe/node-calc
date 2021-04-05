/* eslint-disable no-use-before-define */

const { Token } = require('./tokens');
const tokenize = require('./tokenize');

const clear = arr => arr.filter(Boolean);

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
  let hasDoneSomething = false;
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token.type === Token.TYPES.OPERATOR && token.priority === 3) {
      const prev = tokens[i - 1],
        next = tokens[i + 1],
        value = token.perform(prev.value, next.value);
      tokens[i - 1] = new Token(value.toString(), next.value % 2 === 0 && prev.isNegative);
      tokens[i] = null;
      tokens[i + 1] = null;
      hasDoneSomething = true;
    }
  }
  return hasDoneSomething;
}

function solveOpsWithProriorityOf2(tokens) {
  let hasDoneSomething = false;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === Token.TYPES.OPERATOR && token.priority === 2) {
      const prev = tokens[i - 1],
        next = tokens[i + 1],
        value = token.perform(prev.value, next.value);
      hasDoneSomething = true;
      tokens[i + 1] = new Token(value.toString());
      tokens[i] = null;
      tokens[i - 1] = null;
      i++;
    }
  }
  return hasDoneSomething;
}

function evalTokens(tokens) {
  if (!tokens.length) throw new Error('no tokens');

  solveFunctions(tokens);
  solveParenthesis(tokens);

  // these two stages may put null into the array, we should remove them
  if (solvePowers(tokens)) tokens = clear(tokens);
  if (solveOpsWithProriorityOf2(tokens)) tokens = clear(tokens);

  // now we only have numbers and priority 1 operators (+-)
  // in the form of a+b-c+d-...
  let number = tokens[0].value;
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    number = operator.perform(number, tokens[i + 1].value);
  }
  return number;
}

/** @param {string} expr */
function evalExpression(expr) {
  return evalTokens(tokenize(expr));
}

module.exports = { evalExpression, evalTokens };
