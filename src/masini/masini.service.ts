import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Masini } from './masini.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasiniService {

    constructor(@InjectRepository(Masini) private repo: Repository<Masini>) { }

    async create(
        client_id: number,
        registration_number: string,
        vin_code: string,
        culoare: string,
        km: number) {
        const car = this.repo.create({
            client_id,
            registration_number,
            vin_code,
            culoare,
            km
        });
        return this.repo.save(car);
    }

    async findCarByVinCode(vin_code: number) {
        return await this.repo.findOne({ where: { vin_code } })
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
