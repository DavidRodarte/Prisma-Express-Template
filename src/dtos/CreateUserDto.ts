import { IsEmail, IsString, Length } from 'class-validator';

/**
 * CreateUserDto class
 * @class
 */
export class CreateUserDto {
  /**
   * @type {string}
   */
  @Length(6, 100)
  @IsString()
  name: string;
  /**
   * @type {string}
   */
  @IsEmail()
  email: string;
  /**
   * @type {string}
   */
  @Length(8, 100)
  password: string;
}
