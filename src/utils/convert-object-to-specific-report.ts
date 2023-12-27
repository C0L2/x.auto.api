import { SpecificReport } from "src/types";

export const convertToSpecificReport = (input: any): SpecificReport => {
    return {
        report_id: input.report_id,
        worker_full_name: input.worker_full_name,
        car: input.car,
        client: input.client,
        date: input.date,
        services: input.services,
        car_parts: input.car_parts,
        total: input.total
    };
}