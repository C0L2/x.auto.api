import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Masini } from '../entities/masini.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasiniService {

    constructor(@InjectRepository(Masini) private repo: Repository<Masini>) { }

    async create(
        client_id: number,
        model: string,
        registration_number: string,
        vin_code: string,
        culoare: string,
        km: number,
        year: number) {
        const car = this.repo.create({
            client_id,
            model,
            registration_number,
            vin_code,
            culoare,
            km,
            year
        });
        return this.repo.save(car);
    }

    async findCarByVinCode(vin_code: string): Promise<Masini> {
        const car = await this.repo.findOne({ where: { vin_code } })
        if (!car) {
            throw new Error('This car was not found');
        }
        return car
    }

    async getAll(): Promise<Masini[]> {
        return await this.repo.find();
    }

    async remove(car_id: number) {
        const car = await this.repo.findOne({ where: { car_id } });
        if (!car) {
            throw new Error('This car was not found');
        }
        return this.repo.remove(car);
    }
}
