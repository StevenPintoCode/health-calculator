import {CalculatorFactory, CalculatorParams} from "../src/CalculatorFactory";
import BMICalculator from "../src/BMICalculator";

describe("Testing selection of Calculator creation", () => {
  test("Check if BMICalculator gets returned", () => {
    const calculatorParam: CalculatorParams = {
      gender: 'male',
      age: 20,
      height: 100,
      weight: 200
    }
    const mutBMICalculator = new CalculatorFactory().createCalculator("BMI", calculatorParam)

    expect(mutBMICalculator).toBeInstanceOf(BMICalculator)
  })

  test('It fails with invalid params', () => {
    // @ts-expect-error
    const calculatorParam: CalculatorParams = {
      gender: 'male',
      age: 20,
      height: 100,
    }

    function testCreationError() {
      const mutBMICalculator = new CalculatorFactory().createCalculator("BMI", calculatorParam)
    }

    expect(testCreationError).toThrow(new Error("Invalid input arguments to BMI calculator."))
  })
})


const cases = [[80, 175, 26.1], [50, 130, 29.6], [20, 360, 1.5]]
describe('Testing BMI Calculator Operation, if all inputs valid', () => {
  test.each(cases)("Testing %p and %p cm height, should return %p",
    (firstArgument, secondArgument, expectedValue) => {
      const calculatorParam: CalculatorParams = {
        gender: 'male',
        age: 20,
        height: secondArgument,
        weight: firstArgument
      }
      const getCalculator = new CalculatorFactory().createCalculator('BMI', calculatorParam)

      const result = getCalculator.calculateOperation()
      expect(result).toBe(expectedValue.toString())
    })
})


