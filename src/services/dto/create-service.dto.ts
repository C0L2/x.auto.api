import { IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  service_name: string;
}
