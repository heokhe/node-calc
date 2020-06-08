const tap = require('tap');
const { tokenize, evalTokens } = require('../lib');

tap.throws(() => {
  tokenize('');
  tokenize(' ');
});
tap.throws(() => evalTokens([]));
tap.throws(() => tokenize('2 3'));
tap.throws(() => tokenize('!'));
tap.throws(() => tokenize('/ 5'));
tap.throws(() => tokenize('2 * '));
tap.throws(() => tokenize('2!!'));
tap.throws(() => tokenize('!2'));
tap.throws(() => evalTokens(tokenize('foo(4)')));
tap.throws(() => evalTokens(tokenize('sin45')));
tap.throws(() => evalTokens(tokenize('sin()')));
tap.throws(() => evalTokens(tokenize('2 + sin')));
tap.throws(() => evalTokens(tokenize('(2+2')));
