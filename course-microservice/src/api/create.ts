import { HttpStatus } from '@helpers/errorHandler'
import CourseModel from '@models/course.model'
import { Request, Response, RequestHandler, NextFunction } from 'express'

export type CreateCourseRequest = {
  name: string
  code: string
  description: string
  credits: number
}

const createCourse: RequestHandler = async (
  req: Request<{}, {}, CreateCourseRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await CourseModel.create({ ...req.body })

    res.status(HttpStatus.CREATED).json(course)
  } catch (e: any) {
    next(e)
  }
}
export default createCourse
