import express from 'express'

import addStudentToCourse from './addStudent'
import assignFaculty from './assignFaculty'
import createCourse from './create'
import deleteCourse from './delete'
import enrollToCourse from './enroll'
import enrollList from './enrollList'
import getCourse from './get'
import getAllCourses from './getAll'
import removeStudentFromCourse from './removeStudent'
import updateCourse from './update'
import { AuthenticateToken, UserRoles } from '../helpers/authenticate'

const courseRouter = express.Router()

courseRouter.post('/', AuthenticateToken([UserRoles.ADMIN]), createCourse)
courseRouter.get('/:id', AuthenticateToken(), getCourse)
courseRouter.get('/', AuthenticateToken(), getAllCourses)
courseRouter.put('/:id', AuthenticateToken([UserRoles.ADMIN]), updateCourse)
courseRouter.delete('/:id', AuthenticateToken([UserRoles.ADMIN]), deleteCourse)
courseRouter.put('/admin/assign-faculty', AuthenticateToken([UserRoles.ADMIN]), assignFaculty)

// self enroll
courseRouter.post('/enroll/self/:code', AuthenticateToken(), enrollToCourse)

// enrollment management
courseRouter.get(
  '/entrolled-list/:code',
  AuthenticateToken([UserRoles.ADMIN, UserRoles.INSTRUCTOR]),
  enrollList
)
courseRouter.put(
  '/enroll/add-student',
  AuthenticateToken([UserRoles.ADMIN, UserRoles.INSTRUCTOR]),
  addStudentToCourse
)
courseRouter.put(
  '/enroll/remove-student',
  AuthenticateToken([UserRoles.ADMIN, UserRoles.INSTRUCTOR]),
  removeStudentFromCourse
)

export default courseRouter
