import { ObjectId } from "mongodb"
import {CalculatorParams} from "../Factories/CalculatorFactory";

export default class Audit {
    constructor( public _id: ObjectId,public timestamp: Date, public name?: string, type?: string, params?: CalculatorParams, response?: string) {
    }
}