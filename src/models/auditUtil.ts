import {ObjectId} from "mongodb"
import {CalculatorParams} from "../Factories/CalculatorFactory";

export default class Audit {
    constructor(public _id: ObjectId,
                public timestamp: Date,
                public className?: string,
                public path?: string,
                public type?: string,
                public params?: CalculatorParams,
                public response?: string,
                public statusCode?: number) {
    }
}