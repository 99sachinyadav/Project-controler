import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { clerkMiddleware } from '@clerk/express'
import {serve} from 'inngest/express'
import {inngest, functions} from './inngest/index.js'


const app= express()
dotenv.config()
app.use(express.json())
app.use(cors())


app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);
app.use(clerkMiddleware())
app.get('/',(req,res)=>{
    res.json({message:"Welcome to the Project Management Server"})
})


const PORT =process.env.PORT||5000

app.listen(PORT ,()=>{
    console.log(`Server runing on port ${PORT}`)
})