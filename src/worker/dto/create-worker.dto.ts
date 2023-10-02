import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateWorkerDto {
  @IsString()
  nume_lucrator: string;

  @IsString()
  prenume_lucrator: string;

  @IsEmail()
  email: string;

  @IsString()
  numar_telefon: string;

  @IsNumber()
  salary: number;

  @IsNumber()
  role_id: number;

  @IsString()
  password: string;
}
