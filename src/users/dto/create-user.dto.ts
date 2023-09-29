import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  second_name: string;

  @IsString()
  father_name: string;

  @IsEmail()
  email: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  role: string;

  @IsString()
  password: string;
}
