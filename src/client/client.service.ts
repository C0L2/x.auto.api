import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { ILike, Repository } from 'typeorm';
import { getAllclientsResponse } from 'src/types';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private repo: Repository<Client>) { }

    async create(
        client_name: string,
        email: string,
        phone_number: string
    ): Promise<Client> {
        const existingClient = await this.repo.findOne({
            where: [{ email }, { phone_number }],
        });

        if (existingClient) {
            if (existingClient.email === email && existingClient.phone_number === phone_number) {
                throw new ConflictException("Client with number and email already exists");
            }
            throw new ConflictException("Client with one of these credentials already exists");
        }

        const client = this.repo.create({
            client_name,
            email,
            phone_number,
        });

        return await this.repo.save(client);
    }

    async update(client_id: number, attrs: Partial<Client>): Promise<Client> {
        const client = await this.findById(client_id);
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        Object.assign(client, attrs);

        return this.repo.save(client);
    }

    async remove(client_id: number) {
        const client = await this.repo.findOne({ where: { client_id } });
        if (!client) {
            throw new NotFoundException('Not found a client with this id');
        }
        this.repo.remove(client);
        return { message: 'Client deleted successfully' }
    }

    getAllClientsByEmail(email: string) {
        return this.repo.find({ where: { email } });
    }

    async getAllClients(): Promise<getAllclientsResponse> {
        const clients = await this.repo.find();
        const total = clients.length;

        return { numberOfClients: total, clients };
    }


    async findById(client_id: number): Promise<Client | undefined> {
        return await this.repo.findOne({ where: { client_id } })
    }


    async findByName(nume_client: string): Promise<Client[] | undefined> {
        const client = await this.repo.find({ where: { nume_client: ILike(nume_client) } });
        if (!client) throw new NotFoundException('No client found with this name')
        return client
    }
}
