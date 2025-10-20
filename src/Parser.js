class Parser {
  constructor(expression) {
    // 기본 구분자와 커스텀 구분자 사이에 구별이 필요하지 않기 때문에 Map 보다는 중복을 제거할 수 있는 Set가 더 적합하다고 판단했습니다.
    this.delimiterSet = new Set([",", ":"]);
  }

  extractCustomDelimiterStrictly(expr) { // 커스텀 구분자를 추출(1.구분자는 하나의 문자이며, 2.하나의 종류만 존재한다.)
    const matchedDelimiterArray = expr.match(/\/\/(.*)\\n/); // 정규식으로 커스텀 구분자 필터
    if(!matchedDelimiterArray) return null // 1) 사용자가 커스텀 구분자를 지정하지 않은 경우 그대로 return

    const requestedDelimiter = matchedDelimiterArray[1]; // 사용자가 요청한 구분자 추출
    // 커스텀 구분자 포맷을 가진 경우만 검증
    this.validateCustomDelimiterExpression(expr, requestedDelimiter); 
    return requestedDelimiter; // 2) 커스텀 구분자가 있는 경우 추출하여 해당 구분자 반환
  }

  validateCustomDelimiterExpression(origin, target) {
    if(!origin.startsWith("//") || target.length != 1 || !isNaN(target))
      throw new Error("[ERROR]");
  }

  splitByDelimitersToNumbers(rawNumbers, delimiterSet) { // 구분자와 섞인 숫자 뭉치를 분리
    let numberArray= [rawNumbers];
    delimiterSet.forEach(deli => {
      numberArray = numberArray.flatMap(el => el.split(deli));
    });
    numberArray = numberArray.map(Number);
    return numberArray;
  }

  parseExpressionToNumberList(expression) {
    const customDelimiter = this.extractCustomDelimiterStrictly(expression); // 커스텀 구분자 추출
    if(customDelimiter) this.delimiterSet.add(customDelimiter); // 커스텀 구분자 추가
    const exprBody = expression.slice(5); // 커스텀 헤더 제거하여 숫자본체만 분리
    const parsedNumberList = this.splitByDelimitersToNumbers(exprBody, this.delimiterSet); // 구분자로 각 숫자 분리
  }
}

export default Parser;