// auth-service/src/index.js

import express, { json, urlencoded } from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(json())
app.use(urlencoded({ extended: true }))

// Routes
app.use('/health', (_, res) => {
  res.send('Auth Serive OK')
})

// MongoDB Connection
connect(process.env.MONGO_AUTH_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
