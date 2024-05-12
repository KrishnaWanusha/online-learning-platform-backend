import { HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel from '@models/course.model'

const updateCourse: CustomRequestHandler = async (req, res, next) => {
  try {
    const course = await CourseModel.findOneAndUpdate(
      { displayId: req.params.id },
      { ...req.body },
      { new: true }
    )
    res.status(HttpStatus.OK).json(course)
  } catch (e: any) {
    next(e)
  }
}
export default updateCourse
