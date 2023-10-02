import { IsEmail, IsString } from 'class-validator';

export class LoignWorkerDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
