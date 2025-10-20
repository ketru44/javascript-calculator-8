class Parser {
  constructor(expression) {
    // 기본 구분자와 커스텀 구분자 사이에 구별이 필요하지 않기 때문에 Map 보다는 중복을 제거할 수 있는 Set가 더 적합하다고 판단했습니다.
    this.delimiterSet = new Set([",", ":"]);
  }

  extractCustomDelimiterStrictly(expr) { // 커스텀 구분자를 추출한다(1.구분자는 하나의 문자이며, 2.하나의 종류만 존재한다.)
    const matchedDelimiterArray = expr.match(/\/\/(.*)\\n/);
    return matchedDelimiterArray[1];
  }

  updateDelimiterSet(customDeli) {
    this.delimiterSet.add(customDeli);
  }
  parseExpressionToNumberList(expression) {
    const customDelimiter = this.extractCustomDelimiterStrictly(expression);
    if(customDelimiter) this.updateDelimiterSet(customDelimiter);
  }
}

export default Parser;