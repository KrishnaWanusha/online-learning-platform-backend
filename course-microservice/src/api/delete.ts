import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'

const deleteCourse: CustomRequestHandler = async (req, res, next) => {
  try {
    const deletedCourse = await CourseModel.findOneAndDelete({ displayId: req.params.id })

    if (!deletedCourse) {
      throw new AppError(HttpStatus.NOT_FOUND, `Course with ID ${req.params.id} not found`)
    }
    res.status(HttpStatus.OK).json('success')
  } catch (e: any) {
    next(e)
  }
}
export default deleteCourse
