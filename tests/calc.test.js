const tap = require('tap');
const { evalExpression } = require('../lib');

// basic calculations
tap.equals(evalExpression(' 2 * 2'), 4);
tap.equals(evalExpression('1 + 2 + 3 + 4'), 10);
tap.equals(evalExpression('2 / 2'), 1);

// parenthesis
tap.equals(evalExpression('2(5 + 2)3'), 2 * 7 * 3);
tap.equals(evalExpression('-(2-3)(2+3)'), 5);
tap.equals(evalExpression('+((4*4)-3)'), 13);

// pow
tap.equals(evalExpression('3 ^ 2 ^ 0'), 3);
tap.equals(evalExpression('2 * 3 ^ 2'), 18);

// root functions
tap.equals(evalExpression('cbrt(-8)'), -2);
tap.equals(evalExpression('sqrt(4)(3)'), 6);
tap.equals(evalExpression('sqrt(4)5'), 10);
tap.equals(evalExpression('2sqrt(4)'), 4);

// factorial
tap.equals(evalExpression('7(2+3)!'), 7 * 5 * 4 * 3 * 2);
tap.equals(evalExpression('2!3!'), 2 * 6);
tap.equals(evalExpression('-4!'), -4 * 3 * 2);
tap.equals(evalExpression('1-0!'), 0);
tap.throws(() => evalExpression('2.5!'));
tap.throws(() => evalExpression('(-1)!'));

// trigonometric functions: sin
tap.equals(evalExpression('sin(-30)'), 0.5);
tap.equals(evalExpression('sin(170)'), evalExpression('sin(10)'));
tap.equals(evalExpression('sin(270)'), -1);


// trigonometric functions: cos
tap.equals(evalExpression('cos(240)'), -0.5);
tap.equals(evalExpression('cos(270)'), 0);

// trigonometric functions: tan & cot
tap.equals(evalExpression('cot(4)'), 1 / evalExpression('tan(4)'));
