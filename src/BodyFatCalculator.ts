import Calculator from "./Interfaces/Calculator";

export default class BodyFatCalculator implements Calculator {
  type: string = "Body Fat"
  gender: string
  waist: number | undefined
  neck: number | undefined
  hip: number | undefined
  height: number

  constructor(gender: string, waist: number | undefined, neck: number | undefined, hip: number | undefined, height: number) {
    this.height = height
    this.hip = hip
    this.neck = neck
    this.waist = waist
    this.gender = gender
  }

  calculateOperation(): string {

    if (this.gender === 'male') {
      if(this.waist === undefined || this.neck === undefined){
        throw new Error("Invali argument to BodyFat calculator")
      }
      return ((495 / (1.0324 - 0.19077 * Math.log10(this.waist - this.neck) + 0.15456 * Math.log10(this.height))) - 450).toFixed(1)
    } else {
      if(this.waist === undefined || this.neck === undefined || this.hip === undefined){
        throw new Error("Invali argument to BodyFat calculator")
      }
      return ((495 / (1.29579 - 0.35004 * Math.log10(this.waist + this.hip - this.neck) + 0.22100 * Math.log10(this.height))) - 450).toFixed(1)
    }
  }
}
