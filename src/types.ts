import { Client } from "./entities/client.entity";

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

type assignedService = {
    service_id: number,
    service_name: string
}