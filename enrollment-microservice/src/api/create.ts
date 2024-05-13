import { AppError, HttpStatus } from '@helpers/errorHandler'
import { EnrollmentInterface } from '@models/enrollment.interface'
import EnrollmentModel from '@models/enrollment.model'
import { Request, Response, RequestHandler, NextFunction } from 'express'

type CreateEnrollmentRequest = Omit<EnrollmentInterface, 'completionStatus'>

const createEnrollment: RequestHandler = async (
  req: Request<{}, {}, CreateEnrollmentRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const requiredAttributes: (keyof CreateEnrollmentRequest)[] = ['courseId', 'user']
    const missingAttributes = requiredAttributes.filter((attr) => !(attr in req.body))

    if (missingAttributes.length > 0) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        `Missing required attributes: ${missingAttributes.join(', ')}`
      )
    }

    await EnrollmentModel.create({ ...req.body })

    res.status(HttpStatus.CREATED).json({ success: true })
  } catch (e: any) {
    next(e)
  }
}
export default createEnrollment
