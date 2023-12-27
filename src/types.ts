import { Client } from "./entities/client.entity";
import { Masini } from "./entities/masini.entity";

export type getAllclientsResponse = {
    numberOfClients: number;
    clients: Client[]
}

export type session = {
    cookie: {
        path: string;
        _expires: number | null;
        originalMaxAge: number | null;
        httpOnly: boolean;
        secure: boolean;
    },
    worker: {
        sub: number, //worker_id
        worker_name: string,
        worker_surname: string,
        email: string,
        role: number
    },
    jwt_token: string
}

export type MechanicReport = {
    report_id: number,
    worker_id: number,
    car_id: number,
    date: Date,
    reports: Report[]
}

export type Report = {
    report_id?: number,
    assignedService: assignedService,
    assigned_service_id: number,
    price: number | null,
}


export type CarPart = {
    report_id?: number,
    assignedCarParts: assignedCarParts,
    price: number | null,
    count: number
}

type assignedService = {
    service_id: number,
    service_name: string
}

type assignedCarParts = {
    car_part_id: number,
    car_part_name: string,
}

export type SpecificReport = {
    report_id: number,
    worker_full_name: string,
    car: Masini,
    client: Client,
    date?: Date,
    services: ServicesItem[],
    car_parts: CarPartItem[],
    count?: number
    total: number
}

export type ServicesItem = {
    report_id: number,
    price: number | null,
    assignedService: assignedService
}

export type CarPartItem = {
    report_id: number,
    price: number | null,
    assignedCarPart: assignedCarParts
}