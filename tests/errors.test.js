const tap = require('tap');
const { tokenize, evalTokens } = require('../lib');

const expectError = (testName, fn) => {
  tap.test(testName, t => {
    try {
      fn();
      t.fail();
    } catch (_) {
      t.end();
    }
  });
};

expectError('throws an error when no expression is there', () => {
  tokenize('');
  tokenize(' ');
});
expectError('throws an error when no token is there', () => evalTokens([]));
expectError('throws an error when there\'s an unexpected whitespace', () => tokenize('2 3'));
expectError('throws when an unexpected character comes in', () => tokenize('!'));
expectError('throws when an operator needs a left-hand side expression', () => tokenize('/ 5'));
expectError('throws when an operator expected a right-hand side expression', () => tokenize('2 * '));
expectError('throws when there\'s an unknown function', () => evalTokens(tokenize('foo(4)')));
expectError('throws when a function is written with no braces', () => evalTokens(tokenize('sin45')));
expectError('throws when parenthesis are not balanced', () => evalTokens(tokenize('(2+2')));
