const {
  Operator, Token, Parenthesis, MathFunction
} = require('./tokens');

const lastOf = array => array[array.length - 1];
const lastFunctionIsNotOfType = (tokens, type) => (lastOf(tokens) || {}).functionType !== type;
const lastTokenIsFunctionOrParenthesis = tokens => (
  [Token.TYPES.PARENTHESIS, Token.TYPES.FUNCTION].includes((lastOf(tokens) || {}).type)
);
const lastTokenIsExpression = (tokens, x) => x || lastTokenIsFunctionOrParenthesis(tokens);

/** @param {string} expr */
module.exports = function tokenize(expr) {
  if (!expr.trim()) throw new Error('no expression');

  /** @type {(Token | Operator | Parenthesis | MathFunction)[]} */
  const tokens = [];
  let x = '',
    neg = false,
    open = false,
    f = '',
    n = 0;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];

    // Validate the whitespaces.
    if (/\s/.test(c)) {
      if (i > 0) {
        const beforeWS = expr[i - 1],
          afterWS = expr.slice(i + 1);
        if (/\d/.test(beforeWS) && /^\s*\d/.test(afterWS)) {
          throw new Error('unexpected whitespace');
        }
      }
      continue;
    }

    if (c === '(') {
      open = true;
      n++;
      if (n === 1) {
        if (lastTokenIsExpression(tokens, x)) {
          if (x) tokens.push(new Token(x, neg));
          tokens.push(new Operator('*'));
          x = '';
          neg = false;
        }
        continue;
      }
    } else if (c === ')') {
      n--;
      if (n === 0) {
        open = false;
        if (f) {
          tokens.push(new MathFunction(f, new Parenthesis(`(${x})`), neg));
          f = '';
        } else {
          tokens.push(new Parenthesis(`(${x})`, neg));
        }
        x = '';
        continue;
      }
    }

    if (open) {
      x += c;
      continue;
    }

    if (n === 0 && /[a-z]/.test(c)) f += c;
    else if (c === '!' && lastTokenIsExpression(tokens, x) && lastFunctionIsNotOfType(tokens, 'fact')) {
      let last;
      if (!x) {
        // the previous token is a parenthesis or a function, so it must get removed
        last = lastOf(tokens);
        tokens.pop();
      }
      tokens.push(new MathFunction('fact', new Parenthesis(`(${x || last})`), neg));
      neg = false;
      x = '';
    } else if (/[0-9.]/.test(c)) {
      if (!open && f) throw new Error(`unexpected "${expr.substr(i - f.length, f.length)}"`);
      if (lastTokenIsFunctionOrParenthesis(tokens)) tokens.push(new Operator('*'));
      x += c;
    } else if ([...'^-+*/'].includes(c)) {
      if (lastTokenIsExpression(tokens, x)) {
        if (x) tokens.push(new Token(x, neg));
        tokens.push(new Operator(c));
        x = '';
        neg = false;
      } else if (c === '-') {
        neg = !neg;
      } else if (c !== '+') {
        throw new Error(`unexpected "${c}"`);
      }
    } else throw new Error(`unexpected "${c}"`);
  }

  if (n !== 0) throw new Error('parenthesis are not balanced');
  if (x) tokens.push(new Token(x, neg));

  const last = lastOf(tokens);
  if (last.type === Token.TYPES.OPERATOR) {
    throw new Error(`expected an expression after operator ${last.operatorType} at index ${expr.length - 1}`);
  }
  return tokens;
};
