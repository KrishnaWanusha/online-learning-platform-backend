import { AppError, HttpStatus } from '@helpers/errorHandler'
import CourseModel from '@models/course.model'
import { Request, Response, RequestHandler, NextFunction } from 'express'

const getCourse: RequestHandler = async (req: Request<any>, res: Response, next: NextFunction) => {
  try {
    const course = await CourseModel.findOne({ displayId: parseInt(req.params.id, 10) })

    if (!course?._id)
      throw new AppError(HttpStatus.NOT_FOUND, `Resource not found with id ${req.params.id}`)
    res.status(HttpStatus.OK).json(course)
  } catch (e: any) {
    next(e)
  }
}
export default getCourse
