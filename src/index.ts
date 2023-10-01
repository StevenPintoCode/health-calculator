import {NextFunction, Request, Response} from 'express';
import {CalculateBMI, CalculateBMR, CalculateBodyFat} from './Services/CalculatorService';
import {getErrorMessage} from './util';
import {collections} from "./Services/MongoService";
import Audit from "./models/auditUtil";
import {ObjectId} from "mongodb";

const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT = 8000;
const CLASS_NAME = "index.ts"

app.use("/calculator",async (req: Request, res:Response, next:NextFunction) => {
    const newAudit = {
        _id: new ObjectId(),
        timestamp: new Date(),
        className: CLASS_NAME,
        path: req.path,
        type: undefined,
        params: undefined,
        response: undefined
    } as Audit

    const auditCall = await collections.audits?.insertOne(newAudit)
    next()
})

app.get('/calculator/bmi', async (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log("Running bmi calc")
        const weight = parseInt(req?.query?.weight as string)
        const height = parseInt(req?.query?.height as string)
        const serviceResponse = CalculateBMI(weight, height)

        res.locals.finalResponse = serviceResponse
        res.locals.path = "/calculator/bmi"

        res.status(200).json(serviceResponse)
        next()
    } catch (error) {
        res.status(500).json({error: getErrorMessage(error)})
    }
})


app.get('/calculator/bmr', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const weight = parseInt(req?.query?.weight as string)
        const height = parseInt(req?.query?.height as string)
        const age = parseInt(req?.query?.age as string)
        const gender = req?.query?.gender as string
        const serviceResponse = CalculateBMR(weight, height, age, gender)

        res.locals.finalResponse = serviceResponse
        res.locals.path = "/calculator/bmi"

        res.status(200).json(serviceResponse)
        next()
    } catch (error) {
        res.status(500).json({error: getErrorMessage(error)})
    }
})

app.get('/calculator/bodyfat', (req: Request, res: Response, next: NextFunction) => {

    try {
        const weight = parseInt(req?.query?.weight as string)
        const height = parseInt(req?.query?.height as string)
        const age = parseInt(req?.query?.age as string)
        const gender = req?.query?.gender as string
        const waist = parseInt(req?.query?.waist as string)
        const hip = parseInt(req?.query?.hip as string)
        const neck = parseInt(req?.query?.neck as string)

        const serviceResponse = CalculateBodyFat(weight, height, age, gender, waist, hip, neck)
        res.locals.finalResponse = serviceResponse
        res.locals.path = "/calculator/bmi"

        res.status(200).json(serviceResponse)
        next()
    } catch (error) {
        res.status(500).json({error: getErrorMessage(error)})
    }
})

app.use("/calculator", async (req: Request, res: Response, next: NextFunction) => {

    const newAudit = {
        _id: new ObjectId(),
        timestamp: new Date(),
        className: CLASS_NAME,
        path: req.path,
        type: res.locals?.finalResponse?.type,
        params: res.locals?.finalResponse?.input,
        response: res.locals?.finalResponse?.result
    } as Audit

    const auditCall = await collections.audits?.insertOne(newAudit)
    next()
})
app.get('/results', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '/public/results.html'))
})

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
