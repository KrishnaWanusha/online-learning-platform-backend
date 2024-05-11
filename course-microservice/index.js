// auth-service/src/index.js

import express, { json, urlencoded } from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 6000

app.use(json())
app.use(urlencoded({ extended: true }))

// Routes
app.use('/health', (_, res) => {
  res.send('Course Service OK')
})

// MongoDB Connection
connect(process.env.MONGO_COURSE_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Course Service running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
