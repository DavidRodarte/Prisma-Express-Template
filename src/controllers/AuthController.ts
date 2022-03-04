import { JsonController, Post, Body } from 'routing-controllers';
import { LoginDto } from '../dtos/LoginDto';
import { AuthService } from '../services';

/**
 * AuthController class
 * @decorator `JsonController('/auth')`
 */
@JsonController('/auth')
export class AuthController {
  private authService: AuthService;
  /**
   * Instantiates AuthService
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
