import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgramareDto {
    @IsString()
    appointment_name: string;

    @IsDateString()
    appointment_start_date: string;

    @IsDateString()
    appointment_finish_date: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    client_id: number;

    @IsNumber()
    worker_id: number;
}
