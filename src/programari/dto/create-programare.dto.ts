import { IsDateString, IsString } from 'class-validator';

export class CreateProgramareDto {
    @IsString()
    programare_name: string;

    @IsDateString()
    registr_date: string;
}
