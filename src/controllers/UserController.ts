import { getConnection } from "typeorm"
import { Response } from "express"
import { JsonController, Get, Post, Put, Delete, Res, Param, Body, UseBefore } from "routing-controllers"
import { User } from "../entity/User"
import { hash } from "../utils/Hash"
import { Auth } from "../middleware/Auth"

/**
 * UserController class 
 * @decorator `JsonController('/user')`
 */
@JsonController('/user')
export class UserController {

  /**
   * Index method 
   * @decorator `Get('/')` 
   * @param {any} data
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Get('/')
  public async index(@Body() data: any, @Res() response: Response): Promise<Response> {
    try {
      // Create repository
      const userRepository = getConnection().getRepository(User)
      // Get all users with role relationship
      const users = await userRepository.find({ relations: ['role'] })

      return response.json({
        users
      }) 
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /**
   * Get user by id 
   * @decorator `Get('/:id')`
   * @param {number} id
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Get('/:id')
  public async getUser( @Param("id") id: number, @Res() response: Response ): Promise<Response> {
    try {
      // Create repository
      const userRepository = getConnection().getRepository(User)
      // Find user by id and add role relationship
      const user = await userRepository.findOne(id, { relations: ['role'] })

      if( !user ){
        return response.status(404).json({
          message: `Error: User doesn't exist`
        })
      }

      return response.json({
        user
      }) 
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /**
   * Create new user 
   * @decorator `Post('/')`
   * @param {any} data
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Post('/')
  public async createUser(@Body() data: any, @Res() response: Response): Promise<Response> {
    try {
      const { name, email, password } = data
      
      // Create new user
      const user = new User()

      user.name = name
      user.email = email
      user.password = await hash(password)

      await getConnection().manager.save(user)

      return response.status(201).json({
        message: `User created!`,
        user
      })      
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /** 
   * Update user by id 
   * @decorator `Put('/:id')`
   * @param {number} id
   * @param {any} data
   * @param {Response} response 
   * @returns {Promise<Response>}
   */
  @Put('/:id')
  @UseBefore(Auth)
  public async updateUser( @Param('id') id: number, @Body() data: any, @Res() response: Response ): Promise<Response> {
    try {
      const { name, email, password } = data      

      const userRepository = getConnection().getRepository(User)
      const user = await userRepository.findOne(id)
      
      if( !user ){
        return response.status(404).json({
          message: `Error: User doesn't exist`
        })
      }

      user.name = name
      user.email = email
      user.password = await hash(password)

      await userRepository.save(user)

      return response.json({
        message: `User ${id} updated succesfully`,
        user
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })

    }
  }

  /**
   * Soft delete user by id (set isActive = false)
   * @decorator `Delete('/:id')`
   * @param {number} id
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Delete('/:id')
  @UseBefore(Auth)
  public async deleteUser( @Param('id') id: number, @Res() response: Response): Promise<Response> {
    try {
      const userRepository = getConnection().getRepository(User)
      const user = await userRepository.findOne(id)
      
      if( !user ){
        return response.status(404).json({
          message: `Error: User doesn't exist`
        })
      }
      
      user.isActive = false 

      await userRepository.save(user)

      return response.json({
        message: `User ${id} deactivated succesfully`,
        user
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

}
