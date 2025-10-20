import Parser from "../src/Parser"
describe("Parser", () => {
  test("정상적인 커스텀 구분자 추출 확인", () => {
    const parser = new Parser()
    const deli = parser.extractCustomDelimiterStrictly("//&\\n123")
    expect(deli).toEqual("&");
  });
  // test("비정상적인 커스텀 구분자(2자 이상) 에러 발생 확인", () => {
  //   const parser = new Parser()
  //   expect(() => 
  //     parser.extractCustomDelimiterStrictly("//&#\\n123")
  //   ).toThrow("[ERROR]");
  // });
  // test("비정상적인 커스텀 구분자(숫자) 에러 발생 확인", () => {
  //   const parser = new Parser()
  //   expect(() => 
  //     parser.extractCustomDelimiterStrictly("//3\\n123")
  //   ).toThrow("[ERROR]");
  // });
  // test("커스텀 구분자가 존재하지 않는 경우 에러를 발생하지 않아야 한다.", () => {
  //   const parser = new Parser()
  //   const deli = parser.extractCustomDelimiterStrictly("1,2,3")
  //   expect(deli).toEqual(null);
  // });
})