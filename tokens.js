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
        return a - b;
      case '+':
        return a + b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      case '^':
        return a ** b;
      default:
        return NaN;
    }
  }
}

class Parenthesis extends Token {
  constructor(string, isNegative) {
    super(string, isNegative);
    this.innerValue = string.slice(1, -1);
  }
}

module.exports = { Token, Operator, Parenthesis };
