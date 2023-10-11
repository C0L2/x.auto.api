import { IsString } from 'class-validator';

export class CreateCarPart {
    @IsString()
    car_part_name: string;
}
