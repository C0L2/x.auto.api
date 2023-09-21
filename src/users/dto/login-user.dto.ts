import { IsEmail, IsString } from 'class-validator';

export class LoignUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
