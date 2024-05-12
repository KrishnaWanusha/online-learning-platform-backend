import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'
import UserModel from '@models/user.model'

const removeStudentFromCourse: CustomRequestHandler = async (req, res, next) => {
  try {
    const { course, student } = req.body
    const module = await CourseModel.findOne({ code: course })

    if (!module) throw new AppError(HttpStatus.NOT_FOUND, `Course with code ${course} not found`)
    const user = await UserModel.findOneAndUpdate(
      { username: student },
      { $pull: { courses: module?._id } }
    )

    if (!user?.courses?.includes(module._id))
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        `User is no longer enrolled to the course ${course}`
      )

    res.status(HttpStatus.OK).json({
      message: `course ${course} removed from user ${user?.username}`
    })
  } catch (e: any) {
    next(e)
  }
}
export default removeStudentFromCourse
