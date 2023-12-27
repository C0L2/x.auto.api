import { ArrayNotEmpty, IsArray } from "class-validator";

export class SetUpdatePricesPerReportDto {
    @IsArray()
    serviceIds: number[];

    @IsArray()
    price: number[];

    @IsArray()
    carpartsService: number[];

    @IsArray()
    carpartsPrice: number[]
}