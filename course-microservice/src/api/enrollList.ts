import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'
import UserModel from '@models/user.model'

const enrollList: CustomRequestHandler = async (req, res, next) => {
  try {
    const { code } = req.params

    const course = await CourseModel.findOne({ code })

    if (!course) throw new AppError(HttpStatus.NOT_FOUND, `Course with code ${code} not found`)

    const users = await UserModel.find({ courses: { $elemMatch: { _id: course._id } } })

    res.status(HttpStatus.OK).json({ course: code, enrolledUsers: users.map((m) => m.username) })
  } catch (e: any) {
    next(e)
  }
}
export default enrollList
