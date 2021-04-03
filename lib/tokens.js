const ops = require('./operators');
const fns = require('./functions');

class Token {
  /** @param {string} string */
  constructor(string, isNegative = false) {
    this.type = Token.TYPES.NUMBER;
    this.rawValue = string;
    this.isNegative = isNegative;
  }

  get value() {
    return (this.isNegative ? -1 : 1) * Number.parseFloat(this.rawValue);
  }

  toString() {
    return this.value;
  }

  static get TYPES() {
    return {
      NUMBER: 1,
      OPERATOR: 2,
      PARENTHESIS: 3,
      FUNCTION: 4
    };
  }
}

class Operator extends Token {
  constructor(string) {
    super(string);
    this.type = Token.TYPES.OPERATOR;
    this.operatorType = this.rawValue;
    this.priority = string === '^' ? 3
      : [...'/*'].includes(string) ? 2
        : 1;
  }

  perform(a, b) {
    const type = this.operatorType;
    if (ops[type]) return ops[type](a, b);
    else throw new TypeError(`"${type}" is not a valid operator`);
  }

  toString() {
    return this.operatorType;
  }
}

class Parenthesis extends Token {
  constructor(string, isNegative) {
    super(string, isNegative);
    this.type = Token.TYPES.PARENTHESIS;
    this.innerValue = string.slice(1, -1);
  }

  toString() {
    return `${this.isNegative ? '-' : ''}(${this.innerValue})`;
  }
}

class MathFunction extends Token {
  constructor(type, argument, isNegative) {
    super('', isNegative);
    this.type = Token.TYPES.FUNCTION;
    this.argumentParenthesis = argument;
    this.functionType = type;
  }

  calculate(v) {
    const f = fns[this.functionType];
    if (!f) throw new Error(`unknown function: ${this.functionType}`);
    return (this.isNegative ? -1 : 1) * f(v);
  }

  toString() {
    return `${this.isNegative ? '-' : ''}${this.functionType}(${this.argumentParenthesis.innerValue})`;
  }
}

// eslint-disable-next-line object-curly-newline
module.exports = { Token, Operator, Parenthesis, MathFunction };
