import { IsString } from 'class-validator';

export class CreateFurnizorDto {
    @IsString()
    provider_name: string;

    @IsString()
    provider_adress: string;

    @IsString()
    provider_email: string;

    @IsString()
    provider_phone: string;
}
