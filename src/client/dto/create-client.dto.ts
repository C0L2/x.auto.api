import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
    @IsString()
    nume_client: string;

    @IsEmail()
    email: string;

    @IsString()
    numar_telefon: string;
}