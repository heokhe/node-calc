const tap = require('tap');
const { tokenize, Operator } = require('../lib');

const tokens = tokenize('2sin(30) + (4 * 2)');
tap.equal(tokens.length, 5); // 2, *, sin(30), +, (4*2)

tap.equal(tokens.join(' '), '2 * sin(30) + (4*2)');
tap.equal(tokenize('-(2) * -sqrt(4)').join(''), '-(2)*-sqrt(4)');

// because ! is an unknown operator
// eslint-disable-next-line no-restricted-globals
tap.equal(isNaN(new Operator('!').perform(2, 1)), true);
