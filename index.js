#!/usr/bin/node
const readline = require('readline');
const { redBright, blueBright } = require('chalk');
const evalExpression = require('./eval');

console.log('Welcome to Node.js calculator!');
const rl = readline.createInterface(process.stdin, process.stdout);
function askForAnExpression() {
  rl.question(blueBright('> '), expr => {
    if (expr.trim()) {
      try {
        console.log(evalExpression(expr).toString());
      } catch (e) {
        console.log(redBright(e.message));
      }
    }
    askForAnExpression();
  });
}
askForAnExpression();
