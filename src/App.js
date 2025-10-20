import { Console } from "@woowacourse/mission-utils";
import Parser from "./Parser";

class App {
  constructor() {
    this.parser = new Parser();
  }
  async run() {
    const rawInput = (await this.getInputUsingWoowaMissionUtils("덧셈할 문자열을 입력해 주세요.")).trim(); // 계산해야할 문자열
    this.checkStringIsEmpty(rawInput, "[ERROR] 아무것도 입력되지 않았습니다."); // 빈 입력값에 대한 사전검증
    const parsedNumbers = this.parser.parseExpressionToNumberList(rawInput);
    const calculatedValue = this.accumulateNumbers(parsedNumbers);
  }

  async getInputUsingWoowaMissionUtils(questionString) { // @woowacourse/mission-utils의 Console.readLineAsync 함수로 비동기 입력 받기
    return await Console.readLineAsync(questionString);
  }

  checkStringIsEmpty(str, errMsg) { // 내용과 상관없는 빈 string 자체에 대한 검증 함수
    if(!str || str.trim() === "") throw new Error(errMsg);
  }

  accumulateNumbers(numberArray) {
    return numberArray.reduce((acc, cur) => acc + cur)
  }
}

export default App;
