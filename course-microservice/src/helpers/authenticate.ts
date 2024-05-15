import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomReq } from '@helpers/requestHandler'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

export enum UserRoles {
  ADMIN = 'Admin',
  INSTRUCTOR = 'Instructor',
  LEARNER = 'Learner'
}

export const checkPermissions = (payload: any, roles: UserRoles[]) => {
  return payload?.role && roles.includes(payload.role)
}
//authenticate
export const AuthenticateToken: (roles?: UserRoles[]) => RequestHandler =
  (roles) => (req: CustomReq, _res, next) => {
    try {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]

      if (!token) {
        throw new AppError(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED')
      }

      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        async (err: any, payload: any) => {
          try {
            if (err) {
              throw new AppError(HttpStatus.FORBIDDEN, 'FORBIDDEN')
            }
            if (roles && roles.length > 0) {
              if (!checkPermissions(payload.payload, roles)) {
                throw new AppError(HttpStatus.UNAUTHORIZED, "Don't have permission to access")
              }
            }
            req.user = payload?.payload?.username
            next()
          } catch (e: any) {
            next(e)
          }
        }
      )
    } catch (e) {
      next(e)
    }
  }
