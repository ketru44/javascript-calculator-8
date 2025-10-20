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
      throw new Error("[ERROR] 잘못된 구분자입니다.");
  }

  splitByDelimitersToNumbers(rawNumbers, delimiterSet) { // 구분자와 섞인 숫자 뭉치를 분리
    let numberArray= [rawNumbers];
    delimiterSet.forEach(deli => { // 각 구분자로 분리
      numberArray = numberArray.flatMap(el => el.split(deli));
    });
    numberArray = numberArray.map(num => { // string -> num과 검증
      num = Number(num);
      this.validateBusinessRuleNumber(num);
      return num;
    });
    return numberArray;
  }

  validateBusinessRuleNumber(num) { // 0을 포함한 양의 정수
    if(!Number.isInteger(num) || num < 0)
      throw new Error("[ERROR] 옳지 않은 숫자입니다.(0과 양의 정수만 가능)")
  }

  parseExpressionToNumberList(expression) {
    let targetExpr = expression
    const customDelimiter = this.extractCustomDelimiterStrictly(targetExpr); // 커스텀 구분자 추출
    if(customDelimiter) {
      this.delimiterSet.add(customDelimiter); // 커스텀 구분자 추가
      targetExpr = targetExpr.slice(5); // 커스텀 헤더 제거하여 숫자본체만 분리
    }
    const parsedNumberList = this.splitByDelimitersToNumbers(targetExpr, this.delimiterSet); // 구분자로 각 숫자 분리
    return parsedNumberList;
  }
}

export default Parser;