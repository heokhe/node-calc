# node-calc
A small library/CLI to help you parse and calculate basic math expressions. 
It supports +, -, *, / and ^ operators, parenthesis, and functions such as:
- sin, cos, tan, cot
- sqrt, cbrt

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
