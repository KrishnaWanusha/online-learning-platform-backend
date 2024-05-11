import express, { json, urlencoded } from 'express'
import { config } from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

config()

const apiGateway = express()
const PORT = process.env.PORT || 4000

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

apiGateway.use(json())
apiGateway.use(urlencoded({ extended: true }))

apiGateway.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

apiGateway.use('/health', (_, res) => {
  res.send('API gateway OK')
})

apiGateway.use('/auth', authProxy)
apiGateway.use('/course', courseProxy)

apiGateway.listen(PORT, () => {
  console.log(`Api gateway service running on port ${PORT}`)
})
