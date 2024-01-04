import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgramareDto {
    @IsString()
    programare_name: string;

    @IsDateString()
    programare_date: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    client_id: number;
}
