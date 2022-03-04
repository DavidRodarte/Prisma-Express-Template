import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Length(6, 100)
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Length(8, 100)
  password: string;
}
