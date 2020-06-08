const tap = require('tap');
const { evalExpression } = require('../lib');

const R = Math.PI / 180;

// these are tests for basic calculations

tap.equals(evalExpression(' 2 * 2'), 4);
tap.equals(evalExpression('1 + 2 + 3 + 4'), 10);
tap.equals(evalExpression('2 / 2'), 1);
tap.equals(evalExpression('2(5 + 2)3'), 2 * 7 * 3);
tap.equals(evalExpression('-(2-3)(2+3)'), 5);
tap.equals(evalExpression('+(2-3)'), -1);
tap.equals(evalExpression('3 ^ 2 ^ 0'), 3);
tap.equals(evalExpression('2 * 3 ^ 2'), 18);
tap.equals(evalExpression('-2cos(180)'), 2);
tap.equals(evalExpression('-cos((90*2))'), 1);
tap.equals(evalExpression('2-cos(180)'), 3);
tap.equals(evalExpression('sin(30)10'), 10 * Math.sin(30 * R));
tap.equals(evalExpression('cot(30)'), 1 / Math.tan(30 * R));
tap.equals(evalExpression('tan(30)'), Math.tan(30 * R));
tap.equals(evalExpression('sqrt(4)'), 2);
tap.equals(evalExpression('2cbrt(-8)'), -4);
