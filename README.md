# node-calc
A small library/CLI to help you parse and calculate basic math expressions. 
It supports +, -, *, / and ^ operators, and also parenthesis.

## Installation
```sh
npm i @hkh12/node-calc
```

## Examples
```js
const { evalExpression, tokenize, Token } = require('@hkh12/node-calc');
evalExpression('2*2') // 4
tokenize('2*2') // -> Token[]
```

## CLI
Once installed, you can node-calc in your terminal:
```sh
node-calc "2*2" "2+2" "1*3" # always wrap your expressions in quotes
node-calc # prompts you
```
