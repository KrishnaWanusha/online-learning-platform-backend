import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config()

// eslint-disable-next-line no-console
console.log('Starting Auth Microservice...')

export const apiGateway = express()

apiGateway.use(cors())
apiGateway.use(express.json())

const authProxy = createProxyMiddleware({
  target: process.env.AUTH_API,
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '/'
  }
})

const courseProxy = createProxyMiddleware({
  target: process.env.COURSE_API,
  changeOrigin: true,
  pathRewrite: {
    '^/course': '/'
  }
})

apiGateway.use((req, _res, next) => {
  console.log(req.path, req.method)
  next()
})

apiGateway.use('/auth', authProxy)
apiGateway.use('/course', courseProxy)

if (process.env.NODE_ENV !== 'test') {
  apiGateway.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
  })
}
