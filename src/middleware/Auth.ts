import { ExpressMiddlewareInterface } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import {getConnection} from "typeorm";
import {User} from "../entity/User";

// JwtPayload interface with userId
interface JwtPayload {
  userId: string
}

export class Auth implements ExpressMiddlewareInterface {
    /**
     * Use middleware Auth 
     * @param {Request} request
     * @param {Response} response 
     * @param {NextFunction} next
     * @returns {Promise<any>}
     */
    async use( request: Request, response: Response, next: NextFunction ): Promise<any> {

      const token = request.header('token')
      
      if( !token ) {
        return response.status(401).json({
          message: 'No token found'
        })
    }

    try {
      const { userId } = jwt.verify(token, process.env.SECRET_KEY || '') as JwtPayload
      
      const userRepository = getConnection().getRepository(User)
      const user = await userRepository.findOne({
        where: { id: userId },
        select: [ 'id', 'isActive' ]
      })

      if( !user ) {
        return response.status(401).json({
          message: 'User not found'
        })
      }

      if( !user.isActive ) {
        return response.status(401).json({
          message: 'Blocked user'
        })
      }

      // Add user to request 
      request.user = user 
      
      next()
      
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }

  }
}
