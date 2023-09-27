interface Calculator {
  type: string,

  calculateOperation(): string
}

class BMICalculator implements Calculator {
  type = 'BMI'
  weight: number
  height: number

  constructor(weight: number, height: number) {
    this.weight = weight
    this.height = height
  }

  calculateOperation(): string {
    const value = (this.weight / ((this.height/100) ** 2)).toFixed(1)
    return value
  }
}

class BMRCalculator implements Calculator {
  type = 'Basal Metabolic Rate'
  weight: number
  height: number
  age: number
  gender: string

  constructor(weight: number, height: number, age: number, gender: string) {
    this.weight = weight
    this.height = height
    this.age = age
    this.gender = gender
  }

  calculateOperation(): string {
    if (this.gender === 'male') {
      return (10 * (this.weight) + 6.25 * (this.height) - 5 * (this.age) + 5).toFixed(1)
    }
    return (10 * (this.weight) + 6.25 * (this.height) - 5 * (this.age) - 161).toFixed(1)
  }
}

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
