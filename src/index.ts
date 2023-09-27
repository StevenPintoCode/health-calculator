import {Request, Response} from "express";

const express = require('express')
const app = express()

const PORT = 8000;

app.get("/calculator/bmr", (req:Request, res:Response)=>{

})

app.get('/', (req: Request ,res: Response) => {
  res.status(200)
  res.json({'message': "shit is fucked"})

})
app.listen(PORT, () => {
  console.log('This shit is running now')
})
