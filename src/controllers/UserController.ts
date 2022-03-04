import { Body, JsonController, Get, Param, Post } from 'routing-controllers';
import { User } from '@prisma/client';
import { UserService } from '../services/';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUser } from '../interfaces/IUser';

@JsonController('/user')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @Get('/')
  index(): Promise<IUser[]> {
    return this.userService.index();
  }

  @Get('/:uuid')
  getByUUID(@Param('uuid') uuid: string): Promise<IUser | null> {
    return this.userService.getByUUID(uuid);
  }

  @Post('/')
  create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data);
  }
}
