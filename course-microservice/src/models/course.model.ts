import { AutoIncrementID } from '@typegoose/auto-increment'
import { Severity, getModelForClass, modelOptions, plugin, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { IsInt, IsString } from 'class-validator'
import mongoose, { Model } from 'mongoose'

import { CourseInterface } from './course.interface'

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
export class Course extends TimeStamps implements CourseInterface {
  @prop({ unique: true })
  public displayId?: number

  @prop()
  @IsString()
  public title!: string

  @prop()
  @IsString()
  public description!: string

  @prop()
  @IsString()
  public language!: string

  @prop()
  @IsString()
  public image!: string

  @prop()
  @IsString()
  public category!: string

  @prop()
  @IsInt()
  public price!: number

  @prop()
  @IsString()
  public duration!: string

  @prop({ type: () => [String] })
  @IsString({ each: true })
  public lectures?: string[]
}

const CourseModel = (mongoose.models?.courses as Model<Course>) ?? getModelForClass(Course)

export default CourseModel
