import { AppError, HttpStatus } from '@helpers/errorHandler'
import { CustomReq } from '@helpers/requestHandler'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

// Enum to define user roles
export enum UserRoles {
  ADMIN = 'Admin',
  INSTRUCTOR = 'Instructor',
  LEARNER = 'Learner'
}

// Function to check if the user's role is included in the allowed roles
export const checkPermissions = (payload: any, roles: UserRoles[]) => {
  return payload?.role && roles.includes(payload.role)
}

// Middleware function to authenticate the token and check permissions
export const AuthenticateToken: (roles?: UserRoles[]) => RequestHandler =
  (roles) => (req: CustomReq, _res, next) => {
    try {
      const authHeader = req.headers.authorization
      // Extract the token from the Authorization header
      const token = authHeader && authHeader.split(' ')[1]

      // If no token is found, throw an unauthorized error
      if (!token) {
        throw new AppError(HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED')
      }

      // Verify the token
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        async (err: any, payload: any) => {
          try {
            // If verification fails, throw a forbidden error
            if (err) {
              throw new AppError(HttpStatus.FORBIDDEN, 'FORBIDDEN')
            }

            // Check if the user's role is allowed if roles are specified
            if (roles && roles.length > 0) {
              if (!checkPermissions(payload.payload, roles)) {
                throw new AppError(HttpStatus.UNAUTHORIZED, "Don't have permission to access")
              }
            }

            // Attach user information to the request object
            req.user = payload?.payload
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
