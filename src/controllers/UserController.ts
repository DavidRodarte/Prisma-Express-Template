import { Request, Response } from "express"
import { JsonController, Get, Post, Put, Delete, Req, Res, Param, Body } from "routing-controllers"
import { User } from "../entity/User"

@JsonController('/user')
export class UserController {

  /**
   * Index method 
   * Get /
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Get('/')
  public async index(@Res() response: Response): Promise<Response> {
    try {
      return response.json({
        message: 'Getting users'
      }) 
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /**
   * Get user by id 
   * Get /id
   * @param {number} id
   * @param {Response} response
   * @returns {Response}
   */
  @Get('/:id')
  public async getUser( @Param("id") id: number, @Res() response: Response ): Promise<Response> {
    try {
      return response.json({
        message: 'Getting user '+id
      }) 
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /**
   * Create new user 
   * @param {Request} request
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Post('/')
  public async createUser(@Body() data: any, @Res() response: Response): Promise<Response> {
    try {
      const { name, email, password } = data
      return response.json({
        message: `User ${email} created!`
      })      
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

  /** Update user by id 
   * @param {Request} request
   * @param {Response} response 
   * @returns {Promise<Response>}
   */
  @Put('/:id')
  public async updateUser( @Param('id') id: number, @Body() data:any, @Res() response: Response ): Promise<Response> {
    try {
      const { name, email, password } = data      
      return response.json({
        message: `User ${id} updated succesfully`
      })
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })

    }
  }


  /**
   * Soft delete user by id (set isActive = false)
   * @param {number} id
   * @param {Response} response
   * @returns {Promise<Response>}
   */
  @Delete('/:id')
  public async deleteUser( @Param('id') id: number, @Res() response: Response): Promise<Response> {
    try {
      return response.json({
        message: `User ${id} deleted succesfully`
      }) 
    } catch (error) {
      return response.status(500).json({
        message: `Error ${error}`
      })
    }
  }

}
