# node-calc

[![Build Status](https://travis-ci.org/hkh12/node-calc.svg?branch=master)](https://travis-ci.org/hkh12/node-calc)
[![Coverage Status](https://coveralls.io/repos/github/hkh12/node-calc/badge.svg?branch=master)](https://coveralls.io/github/hkh12/node-calc?branch=master)

A small library/CLI to help you parse and calculate basic math expressions. 
It supports +, -, *, / and ^ operators, parenthesis, and functions such as:
- **Trigonometric functions**: sin, cos, tan, cot
- sqrt, cbrt
- **Factorial**: x! (or fact(x))
- abs

> Functions are written in the form of `f(x)`, `fx` syntax is not supported yet!

## Installation
```sh
npm i @hkh12/node-calc
```

## Examples
```js
const { evalExpression, tokenize, Token, evalTokens } = require('@hkh12/node-calc');
evalExpression('2*2') // 4

const tokens = tokenize('2*2') // -> Token[]
evalTokens(tokens); // 4
```

## CLI
Once installed, you can `node-calc` in your terminal:
```sh
# node-calc [expr...]
node-calc "2*2" "2+2" "1*3" # always wrap your expressions in quotes
node-calc # prompts you
```
