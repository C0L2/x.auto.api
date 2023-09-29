import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  service_name: string;

  @IsNumber()
  service_price: number;
}
