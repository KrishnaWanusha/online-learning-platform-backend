import { errorHandler } from '@helpers/errorHandler'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'

import enrollmentRouter from './api/index.router'
import { connectDB } from './config/db'

dotenv.config()

// eslint-disable-next-line no-console
console.log('Starting Enrollment Microservice...')

connectDB()

export const app = express()

app.use(cors())
app.use(express.json())

app.use('/health', (_req, res) => {
  res.send('Enrollment microservice health ok')
})

app.use('/', enrollmentRouter)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.log(err)
  errorHandler(err, req, res)
})
if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Course Microservice is listening at http://localhost:${process.env.PORT}`)
  })
}
