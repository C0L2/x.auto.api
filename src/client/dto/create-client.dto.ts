import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
    @IsString()
    nume_client: string;

    @IsString()
    prenume_client: string;

    @IsEmail()
    email: string;

    @IsString()
    numar_telefon: string

    @IsString()
    password: string;

    @IsNumber()
    role_id: number;
}