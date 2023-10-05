import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateProgramareDto {
    @IsNumber()
    client_id: number;

    @IsNumber()
    client_type: number;

    @IsString()
    car_model: string;

    @IsString()
    problem_description: string;

    @IsDateString()
    registr_date: string;
}
