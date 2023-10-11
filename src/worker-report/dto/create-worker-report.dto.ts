import { IsNumber } from 'class-validator';

export class CreateWorkerReportDto {
    @IsNumber()
    worker_id: number;

    @IsNumber()
    car_id: number;

    @IsNumber()
    service_id: number;
}
