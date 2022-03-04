import { Authorized, JsonController, Get } from 'routing-controllers';
@JsonController('/example')
export class ExampleController {
  /**
   * Public route example
   */
  @Get('/public')
  publicExample() {
    return 'This is a public route';
  }

  /**
   * Protected route example
   */
  @Get('/protected')
  @Authorized()
  protectedExample() {
    return 'This is a protected route';
  }

  /**
   * Admin route example
   */
  @Get('/admin')
  @Authorized('Admin')
  adminExample() {
    return 'This route is for admins only';
  }
}
