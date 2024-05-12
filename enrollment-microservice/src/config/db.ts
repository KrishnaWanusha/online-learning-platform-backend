import mongoose, { Mongoose } from 'mongoose'

let connection: Mongoose

export const connectDB = async () => {
  if (!connection) {
    connection = await mongoose.connect(process.env.MONGO_URI ?? '', {
      bufferCommands: true,
      serverSelectionTimeoutMS: 5000
    })
    // eslint-disable-next-line no-console
    console.log('Auth Microservice connected to mongodb')
  }
  return connection
}
