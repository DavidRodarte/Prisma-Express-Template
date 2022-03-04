import { PrismaClient, User } from '@prisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { IUser } from '../interfaces/IUser';
import { hash } from '../utils/hash';

export class UserService {
  private prisma: PrismaClient;

  /**
   * UserService constructor,
   * instantiates prisma object
   */
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all users
   */
  async index(): Promise<IUser[]> {
    const users: IUser[] = await this.prisma.user.findMany({
      select: {
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    return users;
  }

  /**
   * Get one user by UUID
   * @param {string} uuid
   */
  async getByUUID(uuid: string): Promise<IUser | null> {
    const user: IUser | null = await this.prisma.user.findUnique({
      where: { uuid },
      select: {
        uuid: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError(`User with UUID "${uuid}" not found`);
    }

    return user;
  }

  /**
   * Get user by email
   */
  async getByEmail(email: string): Promise<IUser | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerError(`Error: ${error}`);
    }
  }

  /**
   * Create user
   * @param {CreateUserDto} createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // If email is already registered
      if (await this.getByEmail(createUserDto.email)) {
        console.log('Email already registered');
        throw new BadRequestError(`Error: Email is already registered`);
      }

      // Hash password
      createUserDto.password = await hash(createUserDto.password);

      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      throw new BadRequestError(`Error: ${error}`);
    }
  }
}
