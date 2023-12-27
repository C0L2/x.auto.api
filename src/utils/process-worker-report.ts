import { Client } from "src/entities/client.entity";
import { Masini } from "src/entities/masini.entity";
import { CarPart, Report } from "src/types";

export const mapReport = (item: Report) => ({
    report_id: item.report_id,
    price: item.price,
    assignedService: {
        service_id: item.assignedService.service_id,
        service_name: item.assignedService.service_name,
    },
});

export const mapPart = (item: CarPart) => ({
    report_id: item.report_id,
    price: item.price,
    count: item.count,
    assignedCarPart: {
        car_part_id: item.assignedCarParts.car_part_id,
        car_part_name: item.assignedCarParts.car_part_name,
    },
});

export const mapCar = (item: Masini) => ({
    car_id: item.car_id,
    client_id: item.client_id,
    reg_number: item.registration_number,
    km: item.km,
})