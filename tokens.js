class Token {
  /**
   * @param {string} string
   */
  constructor(string) {
    this._rawValue = string;
    this.value = Number.parseFloat(string);
    this.isOperator = [...'-+*/'].includes(string);
  }
}

class Operator extends Token {
  constructor(string) {
    super(string);
    this.type = this._rawValue;
    this.hasHighPriority = [...'/*'].includes(string);
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
