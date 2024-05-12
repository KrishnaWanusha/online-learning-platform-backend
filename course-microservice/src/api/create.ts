import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CourseInterface } from '@models/course.interface'
import CourseModel from '@models/course.model'
import { Request, Response, RequestHandler, NextFunction } from 'express'

type CreateCourseRequest = Omit<CourseInterface, 'displayId'>

const createCourse: RequestHandler = async (
  req: Request<{}, {}, CreateCourseRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const requiredAttributes: (keyof CreateCourseRequest)[] = [
      'title',
      'description',
      'language',
      'image',
      'category',
      'price',
      'duration'
    ]
    const missingAttributes = requiredAttributes.filter((attr) => !(attr in req.body))

    if (missingAttributes.length > 0) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        `Missing required attributes: ${missingAttributes.join(', ')}`
      )
    }

    const course = await CourseModel.create({ ...req.body })

    res.status(HttpStatus.CREATED).json(course)
  } catch (e: any) {
    next(e)
  }
}
export default createCourse
