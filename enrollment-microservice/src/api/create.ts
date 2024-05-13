import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomReq } from '@helpers/requestHandler'
import { sendEmail } from '@helpers/sendMail'
import { EnrollmentInterface } from '@models/enrollment.interface'
import EnrollmentModel from '@models/enrollment.model'
import { Response, RequestHandler, NextFunction } from 'express'

type CreateEnrollmentRequest = Omit<EnrollmentInterface, 'completionStatus'>

const createEnrollment: RequestHandler = async (
  req: CustomReq<{}, {}, CreateEnrollmentRequest>,
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

    const subject = `Learnify course purchase`
    const htmlContent = `
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; position: relative;">
    <div style="border: 1px solid #ccc; padding: 20px; border-radius: 8px; position: relative;">
      <h1 style="margin-bottom: 40px; text-align: center; font-weight: bold; font-size: 20px;">Your Course Payment Receipt</h1>
      <p style="margin-bottom: 20px;">Dear ${req.body.user},</p>
      <p style="margin-bottom: 20px;">We are pleased to inform you that we have received your payment for the following course:</p>
      <ul style="margin-bottom: 20px;">
        <li><strong>Course ID :</strong> ${req.body.courseId}</li>
        <li><strong>Payment Method :</strong> Credit Card</li>
      </ul>
      <p style="margin-bottom: 20px;">If you have any questions or concerns regarding your payment or the course, please don't hesitate to contact us.</p>
      <p style="margin-bottom: 60px;">Thank you for choosing our platform for your learning needs.</p>
    </div>
  </div>
`
    await sendEmail([req.user.email], subject, '', htmlContent)

    res.status(HttpStatus.CREATED).json({ success: true })
  } catch (e: any) {
    next(e)
  }
}
export default createEnrollment
