import { ArrayNotEmpty, IsArray } from "class-validator";

export class SetUpdatePricesPerReportDto {
    @IsArray()
    @ArrayNotEmpty()
    serviceIds: number[];

    @IsArray()
    @ArrayNotEmpty()
    price: number[];

    @IsArray()
    @ArrayNotEmpty()
    carpartsService: number[];

    @IsArray()
    @ArrayNotEmpty()
    carpartsPrice: number[]
}