import { errorHandler } from '@helpers/errorHandler'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'

import authRouter from './api/auth/index.router'
import { connectDB } from './config/db'

dotenv.config()

console.log('Starting TimeTable Management System developed by Kr!$h')

connectDB()

export const app = express()

app.use(cors())
app.use(express.json())

app.use((req, _res, next) => {
  console.log(req.path, req.method)
  next()
})

app.get('/', (_, res) =>
  res.json({
    message: 'Welcome to TimeTable Management System developed by Kr!$h'
  })
)

app.use('/auth', authRouter)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(err)
  errorHandler(err, req, res)
})
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
  })
}
