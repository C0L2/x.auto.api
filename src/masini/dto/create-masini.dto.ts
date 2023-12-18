import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMasiniDto {
    @IsOptional()
    @IsNumber()
    client_id: number;

    @IsString()
    model: string;

    @IsString()
    registration_number: string;

    @IsString()
    vin_code: string;

    @IsString()
    culoare: string;

    @IsNumber()
    km: number;

    @IsNumber()
    year: number
}
