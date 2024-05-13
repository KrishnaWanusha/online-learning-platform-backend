import { HttpStatus } from '@helpers/errorHandler'
import CourseModel from '@models/course.model'
import { Request, Response, RequestHandler, NextFunction } from 'express'

const getAllCourses: RequestHandler = async (
  _req: Request<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await CourseModel.find()
    res.status(HttpStatus.OK).json(courses)
  } catch (e: any) {
    next(e)
  }
}
export default getAllCourses
