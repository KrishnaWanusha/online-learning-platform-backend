import { AutoIncrementID } from '@typegoose/auto-increment'
import { Severity, getModelForClass, modelOptions, plugin, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsString } from 'class-validator'
import mongoose, { Model } from 'mongoose'

import { EnrrollmentInterface } from './enrollment.interface'

@plugin(AutoIncrementID, { field: 'displayId', startAt: 1 })
@modelOptions({
    options: { allowMixed: Severity.ERROR, customName: 'enrollments' },
    schemaOptions: { collection: 'enrollments' }
  })

export class Enrollment extends TimeStamps implements EnrrollmentInterface {

    @prop()
    @IsString()
    public courseId!: string

    @prop()
    @IsString()
    public User!: string

    @prop({ default: false }) 
    public completionStatus!: boolean;

}

const EnrollmentModel = (mongoose.models?.enrollments as Model<Enrollment>) ?? getModelForClass(Enrollment)

export default EnrollmentModel
