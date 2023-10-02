import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private repo: Repository<Client>) { }

    async create(
        nume_client: string,
        prenume_client: string,
        email: string,
        numar_telefon: string,
        password: string,
        role_id: number,
    ): Promise<Client> {
        const client = this.repo.create({
            nume_client,
            prenume_client,
            email,
            numar_telefon,
            password,
            role_id,
        });

        return await this.repo.save(client);
    }

    async update(client_id: number, attrs: Partial<Client>) {
        const client = await this.findById(client_id);
        if (!client) {
            throw new Error('Client not found');
        }
        Object.assign(client, attrs);

        return this.repo.save(client);
    }

    async remove(client_id: number) {
        const client = await this.repo.findOne({ where: { client_id } });
        if (!client) {
            throw new Error('Client not found');
        }
        return this.repo.remove(client);
    }

    getAllClients(email: string) {
        return this.repo.find({ where: { email } });
    }

    async findById(client_id: number) {
        return await this.repo.findOne({ where: { client_id } });
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }
}
