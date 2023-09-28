import {CalculatorFactory} from "./CalculatorFactory";

export function CalculateBMI(weight: number, height: number) {
  const calculatorParams = {
    weight: weight,
    height: height
  }

  try {

    const calculatorResult = new CalculatorFactory().createCalculator('BMI', calculatorParams).calculateOperation()
    return {
      "type": "BMI",
      "input": calculatorParams,
      "result": calculatorResult
    }
  }catch (error) {
    throw error
  }

}
