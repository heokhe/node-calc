class Token {
  /**
   * @param {string} string
   */
  constructor(string) {
    this._rawValue = string;
    this.numericValue = Number.parseInt(string);
    this.isOperator = [...'-+*/'].includes(string);
    this.hasHighPriority = [...'/*'].includes(string);
  }
}

class Operator extends Token {
  constructor(string) {
    super(string);
    this.type = this._rawValue;
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
      default:
        return NaN;
    }
  }
}

module.exports = { Token, Operator };
