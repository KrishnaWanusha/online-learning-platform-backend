import { AutoIncrementID } from '@typegoose/auto-increment'
import { Severity, getModelForClass, modelOptions, plugin, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsEnum, IsInt, IsString } from 'class-validator'
import mongoose, { Model } from 'mongoose'

export enum Faculties {
  SOFTWARE_ENGINEERING = 'Software_Engineering',
  CYBER_SECURITY = 'Cyber_Security',
  DATA_SCIENCE = 'Data_Science',
  INFORMATION_TECHNOLOGY = 'Information_Technology'
}

@plugin(AutoIncrementID, { field: 'displayId', startAt: 1 })
@modelOptions({
  options: { allowMixed: Severity.ERROR, customName: 'courses' },
  schemaOptions: { collection: 'courses' }
})
export class Course extends TimeStamps {
  @prop({ unique: true })
  public displayId?: number

  @prop()
  @IsString()
  public name!: string

  @prop({ unique: true })
  @IsString()
  public code!: string

  @prop()
  @IsString()
  public description?: string

  @prop()
  @IsInt()
  public credits!: number

  @IsEnum(Faculties)
  @prop({ type: String, enum: Faculties })
  public faculty?: Faculties
}

const CourseModel = (mongoose.models?.courses as Model<Course>) ?? getModelForClass(Course)

export default CourseModel
