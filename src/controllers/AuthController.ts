import { JsonController, Post, Body } from 'routing-controllers';
import { LoginDto } from '../dtos/LoginDto';
import { AuthService } from '../services';

/**
 * AuthController class
 * @class
 * @decorator `JsonController('/auth')`
 */
@JsonController('/auth')
export class AuthController {
  /**
   * authService property
   * @private
   * @type {AuthService}
   */
  private authService: AuthService;
  /**
   * Instantiates AuthService
   * @constructor
   * @returns void
   */
  constructor() {
    this.authService = new AuthService();
  }
  /**
   * Login method
   * @param {LoginDto} LoginDto
   * @returns {Promise<{}>}
   */
  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{}> {
    return this.authService.login(loginDto);
  }
}
