import { IsArray, IsInt, ArrayMinSize, IsDateString } from 'class-validator';

export class CreateWorkerReportDto {
    @IsInt()
    worker_id: number;

    @IsInt()
    car_id: number;

    @IsDateString()
    date: string;

    @IsArray()
    @ArrayMinSize(1)
    service_ids: number[];
}
