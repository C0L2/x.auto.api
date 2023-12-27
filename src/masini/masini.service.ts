import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Masini } from '../entities/masini.entity';
import { Repository } from 'typeorm';
import { ClientService } from 'src/client/client.service';
import { CreateMasiniDto } from './dto/create-masini.dto';

@Injectable()
export class MasiniService {
    constructor(@InjectRepository(Masini) private repo: Repository<Masini>, private clientService: ClientService) { }

    async create(
        body: CreateMasiniDto) {
        if (body.client_id) {
            const client = await this.clientService.findById(body.client_id);
            if (!client) {
                throw new ConflictException('This client was not found in database')
            }
        }

        const existingCar = await this.repo.findOne({ where: { vin_code: body.vin_code } });
        if (existingCar) throw new ConflictException("Car with this vin code already exists");

        const car = await this.repo.create(body);

        return await this.repo.save(car);
    }

    async updateMasinaWithClientId(vin_code: string, clientId: number): Promise<Masini | undefined> {
        const [existingCar, client] = await Promise.all([
            this.findCarByVinCode(vin_code),
            this.clientService.findById(clientId),
        ]);

        if (!existingCar) {
            throw new ConflictException(`Car not found`);
        }

        if (!client) {
            throw new ConflictException(`Client with ID ${clientId} not found`);
        }

        existingCar.client_id = clientId;

        return this.repo.save(existingCar);
    }

    async findCarByVinCode(vin_code: string): Promise<Masini> {
        const car = await this.repo.findOne({ where: { vin_code } })
        if (!car) {
            throw new ConflictException('This car was not found');
        }
        return car
    }

    async findCarById(car_id: number): Promise<Masini> {
        const car = await this.repo.findOne({ where: { car_id } })
        if (!car) {
            throw new ConflictException('This car was not found');
        }
        return car
    }

    async getAll(): Promise<Masini[]> {
        return await this.repo.find();
    }

    async remove(car_id: number) {
        const car = await this.repo.findOne({ where: { car_id } });
        if (!car) {
            throw new ConflictException('This car was not found');
        }
        return this.repo.remove(car);
    }
}
