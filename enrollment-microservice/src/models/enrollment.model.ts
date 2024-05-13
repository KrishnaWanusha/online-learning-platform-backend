import { getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsString } from 'class-validator'
import mongoose, { Model } from 'mongoose'

import { EnrollmentInterface } from './enrollment.interface'

export class Enrollment extends TimeStamps implements EnrollmentInterface {
  @prop()
  @IsString()
  public courseId!: string

  @prop()
  @IsString()
  public user!: string

  @prop({ default: false })
  public completionStatus?: boolean
}

const EnrollmentModel =
  (mongoose.models?.enrollments as Model<Enrollment>) ?? getModelForClass(Enrollment)

export default EnrollmentModel
