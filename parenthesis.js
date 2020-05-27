function solveParenthesis(expression, callback) {
  if (!expression.includes('(')) return expression;

  const output = [];
  let n = 0,
    open = false,
    innerValue = '';
  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (char === '(') {
      n++;
      if (n === 1) {
        open = true;
        continue;
      }
    } else if (char === ')') {
      n--;
      if (n === 0) {
        open = false;
        output.push(callback(innerValue));
        innerValue = '';
        continue;
      }
    }

    if (open) innerValue += char;
    else output.push(char);
  }
  if (n !== 0) throw new Error('parenthesis are not balanced');
  return output.join('');
}

module.exports = solveParenthesis;
