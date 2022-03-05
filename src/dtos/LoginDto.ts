import { IsEmail, Length } from 'class-validator';
/**
 * LoginDto class
 * @class
 */
export class LoginDto {
  /** @type {string} */
  @IsEmail()
  email: string;
  /** @type {string} */
  @Length(8, 100)
  password: string;
}
