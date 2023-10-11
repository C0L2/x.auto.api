import { IsDateString } from 'class-validator';

export class GetProgramariBetweenDatesDto {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}
