import BodyFatCalculator from "../src/Classes/BodyFatCalculator";

const cases = [[40, 178, 50, 90, 62, 10.6], [40, 100, 50, 90, 62, 27.8]]
describe("Testing body fat calculator", () => {
  test.each(cases)("Testing when age and gender is male, weight: %p kg, height: %p cm, neck: %p cm, waist %p cm, hip %p cm",
    (first, second, third, fourth, fifth, expectedValue) => {
      const bodyFatCalc = new BodyFatCalculator("male", fourth, third, undefined, second)
      const result = bodyFatCalc.calculateOperation()

      expect(result).toBe(expectedValue.toString())
    })
})
