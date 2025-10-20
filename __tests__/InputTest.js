import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

describe("문자열 계산기 입력", () => {
  test("입력이 들어오는 지 확인", async () => {
    const inputs = ["1,2,3"];
    mockQuestions(inputs);
    const app = new App();
    const testingInput = await app.getInputUsingWoowaMissionUtils("덧셈할 문자열을 입력해 주세요.");

    expect(testingInput).toBe("1,2,3");
  });
  test("좌우 공백이 존재하는 입력이 그대로 들어오는 지 확인", async () => {
    const inputs = [" 1,2,3 "];
    mockQuestions(inputs);
    const app = new App();
    const testingInput = await app.getInputUsingWoowaMissionUtils("덧셈할 문자열을 입력해 주세요.");

    expect(testingInput).toBe(" 1,2,3 ");
  });
  test("입력된 값이 비어있는지 검증", async () => {
    const errMsg = "[ERROR] 아무것도 입력되지 않았습니다.";
    const app = new App();
    expect(() => app.checkStringIsEmpty(null, errMsg)).toThrow("[ERROR] 아무것도 입력되지 않았습니다.");
    expect(() => app.checkStringIsEmpty("  ", errMsg)).toThrow("[ERROR] 아무것도 입력되지 않았습니다.");
    expect(() => app.checkStringIsEmpty(undefined, errMsg)).toThrow("[ERROR] 아무것도 입력되지 않았습니다.");
  });
});
