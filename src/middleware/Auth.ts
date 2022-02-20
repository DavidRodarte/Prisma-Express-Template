import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";

export class Auth implements ExpressMiddlewareInterface{
  /**
   * Use middleware Auth 
   * @param {any} request
   * @param {any} response 
   * @param {any} next
   */
  use( request: Request, response: Response, next?: (err?: any) => any ): Response | any {
    const token = request.header('token')
    
    if( !token ) {
      return response.status(401).json({
        message: 'No token found'
      })
    }
  }
}
