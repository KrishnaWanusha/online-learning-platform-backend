import express from 'express'

import createCourse from './create'
import deleteCourse from './delete'
import getCourse from './get'
import getAllCourses from './getAll'
import updateCourse from './update'
import { AuthenticateToken, UserRoles } from '../helpers/authenticate'

const courseRouter = express.Router()

courseRouter.post('/add', createCourse)
courseRouter.get('/get/:id', AuthenticateToken(), getCourse)
courseRouter.get('/all', getAllCourses)
courseRouter.put('/edit/:id', AuthenticateToken([UserRoles.ADMIN]), updateCourse)
courseRouter.delete('/delete:id', AuthenticateToken([UserRoles.ADMIN]), deleteCourse)

export default courseRouter
