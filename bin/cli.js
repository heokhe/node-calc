#!/usr/bin/node
const readline = require('readline');
const { redBright, blueBright } = require('chalk');
const { evalExpression } = require('../lib/eval');
const { version } = require('../package.json');

function printExpression(expr) {
  try {
    console.log(evalExpression(expr));
  } catch (e) {
    console.log(redBright(e.message));
  }
}

const [,, ...args] = process.argv;

if (args.length) {
  for (const expression of args) printExpression(expression);
} else {
  console.log(`Welcome to Node.js calculator! (version ${version})`);
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.addListener('close', () => console.log('\nBye Bye!'));
  const askForAnExpression = () => {
    rl.question(blueBright('> '), expr => {
      if (expr.trim()) printExpression(expr);
      askForAnExpression();
    });
  };
  askForAnExpression();
}
