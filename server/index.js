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


app.get('/',(req,res)=>{
    res.json({message:"Welcome to the Project Management Server"})
})
 
app.use(clerkMiddleware())

const PORT =process.env.PORT||5000

app.listen(PORT ,()=>{
    console.log(`Server runing on port ${PORT}`)
})