import Calculator from "./Interfaces/Calculator";
import BMRCalculator from "./BMRCalculator";
import BMICalculator from "./BMICalculator";
export interface CalculatorParams {
  weight: number,
  height: number,
  age: number,
  gender: string
}

export class CalculatorFactory {
  createCalculator(type: string, calculatorParams: CalculatorParams): Calculator {
    if(type === "BMI"){
      return new BMICalculator(calculatorParams.weight, calculatorParams.height)
    }else if(type === 'BMR'){
      return new BMRCalculator(calculatorParams.weight,calculatorParams.height, calculatorParams.age,
        calculatorParams.gender)
    }else {
      throw new Error("No calculator available for that request")
    }
  }
}
