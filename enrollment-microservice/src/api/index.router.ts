import express from 'express'

import createEnrollment from './create'
import { AuthenticateToken } from '../helpers/authenticate'

const courseRouter = express.Router()

courseRouter.post('/create', AuthenticateToken(), createEnrollment)
// courseRouter.post('/', AuthenticateToken(), completeCourse)

export default courseRouter
