import { Client } from "./entities/client.entity";

export type getAllclientsResponse = {
    numberOfClients: number;
    clients: Client[]
}