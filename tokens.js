const ops = require('./operators');
const fns = require('./functions');

class Token {
  /** @param {string} string */
  constructor(string, isNegative = false) {
    this._rawValue = string;
    this.isOperator = [...'-+*/^'].includes(string);
    this.isNegative = isNegative;
  }

  get value() {
    return (this.isNegative ? -1 : 1) * Number.parseFloat(this._rawValue);
  }

  toString() {
    return this.value;
  }
}

class Operator extends Token {
  constructor(string) {
    super(string);
    this.type = this._rawValue;
    this.priority = string === '^' ? 3
      : [...'/*'].includes(string) ? 2
        : 1;
  }

  perform(a, b) {
    switch (this.type) {
      case '-':
        return ops.sub(a, b);
      case '+':
        return ops.add(a, b);
      case '*':
        return ops.mul(a, b);
      case '/':
        return ops.div(a, b);
      case '^':
        return a ** b;
      default:
        return NaN;
    }
  }

  toString() {
    return this.type;
  }
}

class Parenthesis extends Token {
  constructor(string, isNegative) {
    super(string, isNegative);
    this.innerValue = string.slice(1, -1);
  }

  toString() {
    return `${this.isNegative ? '-' : ''}(${this.innerValue})`;
  }
}

class MathFunction extends Token {
  constructor(type, argument, isNegative) {
    super('', isNegative);
    this.arg = argument;
    this.type = type;
  }

  calculate(v) {
    const f = fns[this.type];
    if (!f) throw new Error(`unknown function: ${this.type}`);
    return (this.isNegative ? -1 : 1) * f(v);
  }
}

// eslint-disable-next-line object-curly-newline
module.exports = { Token, Operator, Parenthesis, MathFunction };
