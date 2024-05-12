import { HttpStatus } from '@helpers/errorHandler'
import { CustomRequestHandler } from '@helpers/requestHandler'
import CourseModel, { Faculties } from '@models/course.model'

export type AssignFacultyResquestType = {
  courseCode: string
  faculty: Faculties
}

const assignFaculty: CustomRequestHandler = async (req, res, next) => {
  try {
    const { courseCode, faculty } = req.body

    const course = await CourseModel.findOneAndUpdate(
      { code: courseCode },
      { faculty },
      { new: true }
    )

    res.status(HttpStatus.OK).json(course)
  } catch (e: any) {
    next(e)
  }
}
export default assignFaculty
