import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'
import UserModel from '@models/user.model'

const addStudentToCourse: CustomRequestHandler = async (req, res, next) => {
  try {
    const { course, student } = req.body

    const user = await UserModel.findOneAndUpdate(
      { username: student },
      { $push: { courses: await CourseModel.findOne({ code: course }) } },
      { new: true }
    )

    if (!user) throw new AppError(HttpStatus.BAD_REQUEST, 'BAD REQUEST')

    res.status(HttpStatus.OK).json({
      message: `user added to course ${course}`,
      user: { name: user.username, courses: user.courses }
    })
  } catch (e: any) {
    next(e)
  }
}
export default addStudentToCourse
