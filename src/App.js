import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    const rawInput = await this.getInputUsingWoowaMissionUtils("덧셈할 문자열을 입력해 주세요.").trim(); // 계산해야할 문자열 
  }

  async getInputUsingWoowaMissionUtils(questionString) { // @woowacourse/mission-utils의 Console.readLineAsync 함수로 비동기 입력 받기
    return await Console.readLineAsync(questionString);
  }
}

export default App;
