import {JsonController, Post, Res, Body} from "routing-controllers";
import { Response } from "express";
import {getConnection} from "typeorm";
import {User} from "../../entity/User";
import bcryptjs from 'bcryptjs'
import { generateJWT } from "../../utils/GenerateJWT";

/**
 * AuthController class 
 * @decorator `JsonController('/auth')`
 */
@JsonController('/auth')
export class AuthController {

  /**
   * Login method 
   * @param {any} data 
   * @param {Response} response 
   * @returns {Promise<Response>}
   */
  @Post('/login')
  public async login(@Body() data: any, @Res() response: Response): Promise<Response> {
    try {
      const { email, password } = data 
      // Find user by email and get their id, email and password 
      const userRepository = getConnection().getRepository(User)
      const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password']
      })
      
      // User doesn't exist
      if( !user ){
        return response.status(404).json({
          message: 'Wrong credentials'
        })
      }
      // Verify password hashes
      const verifyPassword = bcryptjs.compareSync(password, user.password)
      
      // Wrong password
      if( !verifyPassword ) {
        return response.json(401).json({
          message: 'Wrong credentials'
        })
      }
      
      // Generate JWT
      const token = await generateJWT(user.id)

      return response.json({
        message: 'Signed in!',
        token
      })

    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      }) 
    }
  }
}
