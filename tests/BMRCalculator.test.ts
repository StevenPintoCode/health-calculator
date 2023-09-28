import { CalculatorParams } from "../src/CalculatorFactory";
import BMRCalculator from "../src/Classes/BMRCalculator";

const casesMale = [[80, 175, 1799], [50, 130, 1218], [20, 360, 2355]]
describe('Testing BMR Calculator Operation, if all inputs valid', () => {
  test.each(casesMale)("Testing %pkg and %p cm heightm where gender is male and age is 20, should return %p",
    (firstArgument, secondArgument, expectedValue) => {
      const calculatorParam: CalculatorParams = {
        gender: 'male',
        age: 20,
        height: secondArgument,
        weight: firstArgument
      }
      const getCalculator = new BMRCalculator(firstArgument, secondArgument, calculatorParam.age, calculatorParam.gender)

      const result = getCalculator.calculateOperation()
      expect(result).toBe(expectedValue.toString())
    })
})
