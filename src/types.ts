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