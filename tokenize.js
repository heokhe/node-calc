const { Operator, Token, Parenthesis } = require('./tokens');

/** @param {string} expr */
module.exports = function tokenize(expr) {
  /** @type {(Token | Operator)[]} */
  const tokens = [];
  let x = '',
    neg = false,
    open = false,
    n = 0;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];

    // Validate the whitespaces.
    if (i > 0 && /\s/.test(c)) {
      const beforeWS = expr[i - 1],
        afterWS = expr.slice(i + 1);
      if (/\d/.test(beforeWS) && /^\s*\d/.test(afterWS)) {
        throw new Error('unexpected whitespace');
      } else continue;
    }

    if (/\s/.test(c)) continue;

    if (c === '(') {
      open = true;
      n++;
      if (n === 1) {
        if (x || tokens[tokens.length - 1] instanceof Parenthesis) {
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
        tokens.push(new Parenthesis(`(${x})`, neg));
        x = '';
        if (/[0-9.]/.test(expr[i + 1])) tokens.push(new Operator('*'));
        continue;
      }
    }

    if (open) {
      x += c;
      continue;
    }

    if (/[0-9.]/.test(c)) x += c;
    else if ([...'^-+*/'].includes(c)) {
      if (x || tokens[tokens.length - 1] instanceof Parenthesis) {
        if (x) tokens.push(new Token(x, neg));
        tokens.push(new Operator(c));
        x = '';
        neg = false;
      } else if (c === '-') neg = !neg;
      else if (c !== '+') throw new Error(`unexpected "${c}"`);
    } else throw new Error(`unexpected "${c}"`);
  }
  if (n !== 0) throw new Error('parenthesis are not balanced');
  if (tokens[tokens.length - 1] instanceof Operator && !x) {
    throw new Error(`expected an expression after operator ${tokens[tokens.length - 1].type} at index ${expr.length - 1}`);
  }
  if (x) tokens.push(new Token(x, neg));
  return tokens;
};
