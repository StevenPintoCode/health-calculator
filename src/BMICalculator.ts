import Calculator from "./Interfaces/Calculator";

export default class BMICalculator implements Calculator {
  type = 'BMI'
  weight: number
  height: number

  constructor(weight: number, height: number) {
    this.weight = weight
    this.height = height
  }

  calculateOperation(): string {
    return (this.weight / ((this.height / 100) ** 2)).toFixed(1)
  }
}

