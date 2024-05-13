import { AuthenticateToken } from '@helpers/authenticate'
import express from 'express'

import createPayment from './create'

const paymntRouter = express.Router()

paymntRouter.post('/create', AuthenticateToken(), createPayment)
// courseRouter.post('/', AuthenticateToken(), completeCourse)

export default paymntRouter
