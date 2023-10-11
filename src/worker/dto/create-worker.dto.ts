import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  worker_name: string;

  @IsString()
  worker_surname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  role_id: number;
}
