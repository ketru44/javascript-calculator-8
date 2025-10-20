import Parser from "../src/Parser"
describe("Parser 구분자 추출", () => {
  test("정상적인 커스텀 구분자 추출 확인", () => {
    const parser = new Parser()
    const deli = parser.extractCustomDelimiterStrictly("//&\\n123")
    expect(deli).toEqual("&");
  });
  test("비정상적인 커스텀 구분자(2자 이상) 에러 발생 확인", () => {
    const parser = new Parser()
    expect(() => 
      parser.extractCustomDelimiterStrictly("//&#\\n123")
    ).toThrow("[ERROR]");
  });
  test("비정상적인 커스텀 구분자(숫자) 에러 발생 확인", () => {
    const parser = new Parser()
    expect(() => 
      parser.extractCustomDelimiterStrictly("//3\\n123")
    ).toThrow("[ERROR]");
  });
  test("비정상적인 커스텀 구분자(구분자가 여러개) 에러 발생 확인", () => {
    const parser = new Parser()
    expect(() => 
      parser.extractCustomDelimiterStrictly("//%\\n1:2//&\\n3")
    ).toThrow("[ERROR]");
  });
  test("커스텀 구분자가 존재하지 않는 경우 에러를 발생하지 않아야 한다.", () => {
    const parser = new Parser()
    const deli = parser.extractCustomDelimiterStrictly("1,2,3")
    expect(deli).toEqual(null);
  });
  test("구분자 리스트 추가 확인", () => {
    const parser = new Parser();
    parser.delimiterSet.add("&");
    expect(parser.delimiterSet).toStrictEqual(new Set([",", ":", "&"]));
  });
  test("커스텀 구분자 추출 후, 구분자 리스트 추가 확인", () => {
    const parser = new Parser();
    parser.parseExpressionToNumberList("//&\\n1&2&3");
    expect(parser.delimiterSet).toStrictEqual(new Set([",", ":", "&"]));
  });
});

describe("Parser 숫자 분리", () => {
  test("기본 구분자 숫자 분리(단일)", () => {
    const parser = new Parser();
    const result = parser.splitByDelimitersToNumbers("1,2,3", parser.delimiterSet);
    expect(result).toStrictEqual([1, 2, 3])
  });
  test("기본 구분자 숫자 분리(혼합)", () => {
    const parser = new Parser();
    const result = parser.splitByDelimitersToNumbers("1,2:3", parser.delimiterSet);
    expect(result).toStrictEqual([1, 2, 3])
  });
  test("커스텀구분자 숫자 분리(단일)", () => {
    const parser = new Parser();
    parser.delimiterSet.add("(");
    const result = parser.splitByDelimitersToNumbers("1(2(3", parser.delimiterSet);
    expect(result).toStrictEqual([1, 2, 3])
  });
  test("커스텀구분자 숫자 분리(기본 구분자와 혼합)", () => {
    const parser = new Parser();
    parser.delimiterSet.add("(");
    const result = parser.splitByDelimitersToNumbers("1:2(3", parser.delimiterSet);
    expect(result).toStrictEqual([1, 2, 3])
  });
  test("잘못된 숫자 검증(소수, 음수)", () => {
    const parser = new Parser();
    expect(() => parser.splitByDelimitersToNumbers("1:2.4:3", parser.delimiterSet)).toThrow("[ERROR]")
    expect(() => parser.splitByDelimitersToNumbers("1:-3:3", parser.delimiterSet)).toThrow("[ERROR]")
  });
  
})