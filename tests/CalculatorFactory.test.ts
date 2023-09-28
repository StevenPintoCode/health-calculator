import {CalculatorFactory, CalculatorParams} from "../src/Factories/CalculatorFactory";
import BMICalculator from "../src/Classes/BMICalculator";
import BMRCalculator from "../src/Classes/BMRCalculator";
import BodyFatCalculator from "../src/Classes/BodyFatCalculator";

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

  test("Check if BMRCalculator gets returned", () => {
    const calculatorParam: CalculatorParams = {
      gender: 'male',
      age: 20,
      height: 100,
      weight: 200
    }
    const mutBMICalculator = new CalculatorFactory().createCalculator("BMR", calculatorParam)

    expect(mutBMICalculator).toBeInstanceOf(BMRCalculator)
  })

  test("Check if Body fat calculator gets returned", () => {
    const calculatorParam: CalculatorParams = {
      gender: 'male',
      age: 20,
      height: 100,
      weight: 200
    }
    const mutBMICalculator = new CalculatorFactory().createCalculator("BF", calculatorParam)

    expect(mutBMICalculator).toBeInstanceOf(BodyFatCalculator)
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
