import { Request, Response } from "express"

export class UserController {

  /**
   * Index method 
   * @param Request 
   * @param Response
   * @returns Response
   */
  public static async index( req: Request, res: Response ): Promise<Response> {
    return res.json({
      message: 'Getting users ...'
    }) 
  }

  /**
   * Get user by id 
   * @param Request
   * @param Response
   * @returns Response
   */
  public static async getUser( req: Request, res: Response ): Promise<Response> {
    const { id } = req.params
    return res.json({
      message: `Getting user ${id}`
    })
  }
  
  /**
   * Create new user 
   * @param Request
   * @param Response
   * @returns Response
   */
  public static async createUser( req: Request, res: Response ): Promise<Response> {
    try {
      
      return res.json({
        message: 'Creating user'
      })
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}`
      })
    } 
  }
/** Update user by id @param Request
   * @param Response 
   * @returns Response
   */
  public static async updateUser( req: Request, res: Response ): Promise<Response> {
    try {
      const { id } = req.params

      return res.json({
        message: 'Updating user'
      })
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`
      })
    }
  }


  /**
   * Soft delete user by id (set isActive = false)
   * @param Request
   * @param Response
   * @returns Response
   */
  public static async deleteUser( req: Request, res: Response ): Promise<Response> {
    try {
      const { id } = req.params

      return res.json({
        message: 'Deleting user'
      })
    } catch (error) {
      return res.status(500).json({
        message: `Error ${error}`
      })
    }
  }

}
