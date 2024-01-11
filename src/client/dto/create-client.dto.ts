import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
    @IsString()
    client_name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;
}