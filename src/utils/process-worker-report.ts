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
    assignedCarPart: {
        car_part_id: item.assignedCarParts.car_part_id,
        car_part_name: item.assignedCarParts.car_part_name,
    },
});