import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'
import UserModel from '@models/user.model'

const enrollToCourse: CustomRequestHandler = async (req, res, next) => {
  try {
    const { code } = req.params

    const course = await CourseModel.findOne({ code })

    if (!course) throw new AppError(HttpStatus.NOT_FOUND, `Course with code ${code} not found`)

    await UserModel.findOneAndUpdate({ username: req.user }, { $push: { courses: course } })

    res.status(HttpStatus.OK).json('success')
  } catch (e: any) {
    next(e)
  }
}
export default enrollToCourse
