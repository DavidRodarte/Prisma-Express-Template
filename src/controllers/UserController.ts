import {
  Body,
  JsonController,
  Get,
  Param,
  Post,
  Delete,
  OnUndefined,
} from 'routing-controllers';
import { User } from '@prisma/client';
import { UserService } from '../services/';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUser } from '../interfaces/IUser';

/**
 * UserController class
 * @class
 */
@JsonController('/user')
export class UserController {
  /**
   * userService property
   * @private
   * @type {UserService}
   */
  private userService: UserService;

  /**
   * Instantiates UserService
   * @constructor
   * @returns void
   */
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users
   * @memberof UserController
   * @returns {Promise<IUser>}
   */
  @Get('/')
  index(): Promise<IUser[]> {
    return this.userService.index();
  }

  /**
   * Get one user by uuid
   * @memberof UserController
   * @param {string} uuid
   * @returns {Promise<IUser | null>}
   */
  @Get('/:uuid')
  getByUUID(@Param('uuid') uuid: string): Promise<IUser | null> {
    return this.userService.getByUUID(uuid);
  }

  /**
   * Create new user
   * @memberof UserController
   * @param {CreateUserDto} data
   * @returns {Promise<User>}
   */
  @Post('/')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }

  /**
   * Soft delete user
   * @memberof UserController
   * @param {string} uuid
   * @returns {Promise<void>}
   */
  @Delete('/:uuid')
  @OnUndefined(204)
  delete(@Param('uuid') uuid: string): Promise<void> {
    return this.userService.delete(uuid);
  }
}
