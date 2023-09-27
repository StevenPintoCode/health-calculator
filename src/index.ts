import { Request, Response} from "express";
import {CalculateBMI} from "./CalculatorService";
import {getErrorMessage} from "./util";

const express = require('express')
const app = express()

const PORT = 8000;

app.get("/calculator/bmi", (req:Request, res:Response)=>{

  try {
    const weight = parseInt(req?.query?.weight as string)
    const height = parseInt(req?.query?.height as string)
    const serviceResponse = CalculateBMI(weight, height)
    res.status(200).json(serviceResponse)
  }catch (error){
    res.status(500).json({error: getErrorMessage(error)})
  }
})

app.get('/', (req: Request ,res: Response) => {
  res.status(200)
  res.json({'message': "shit is fucked"})

})
app.listen(PORT, () => {
  console.log('This shit is running now')
})
