const { Operator, Token } = require('./tokens');

/** @param {string} expr */
module.exports = function tokenize(expr) {
  /** @type {(Token | Operator)[]} */
  const tokens = [];
  let x = '',
    o = null,
    neg = false;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];

    if (i > 0 && /\s/.test(c)) {
      const beforeWS = expr[i - 1],
        afterWS = expr.slice(i + 1);
      if (/\d/.test(beforeWS) && /^\s*\d/.test(afterWS)) {
        throw new Error('unexpected whitespace');
      } else continue;
    }
    if (/[0-9.]/.test(c)) x += c;
    else if ([...'-+*/'].includes(c)) {
      if (!x) {
        if (c === '-') neg = !neg;
        else if (c !== '+') throw new Error(`unexpected "${c}"`);
      } else {
        o = c;
        tokens.push(new Token(neg ? `-${x}` : x), new Operator(c));
        x = '';
        neg = false;
      }
    } else throw new Error(`unexpected "${c}"`);
  }
  if (!x) {
    throw new Error(`expected an expression after operator ${o}`);
  }
  tokens.push(new Token(neg ? `-${x}` : x));
  return tokens;
};
