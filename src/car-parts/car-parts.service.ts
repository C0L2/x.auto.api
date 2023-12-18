import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarParts } from 'src/entities/car-parts.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CarPartsService {

    constructor(
        @InjectRepository(CarParts) private repo: Repository<CarParts>) { }

    async create(
        car_part_name: string
    ): Promise<CarParts> {
        const worker = await this.repo.create({ car_part_name });
        return await this.repo.save(worker);
    }


    async update(car_part_id: number, attrs: Partial<CarParts>): Promise<CarParts> {
        const car_part = await this.findById(car_part_id);
        if (!car_part) {
            throw new Error('Car part not found');
        }
        Object.assign(car_part, attrs);

        return this.repo.save(car_part);
    }

    async remove(car_part_id: number): Promise<CarParts> {
        const car_part = await this.repo.findOne({ where: { car_part_id } });
        if (!car_part) {
            throw new ConflictException('Car part not found');
        }
        return this.repo.remove(car_part);
    }

    async findById(car_part_id: number) {
        return await this.repo.findOne({ where: { car_part_id } });
    }

    async findByName(car_part_name: string): Promise<CarParts[] | undefined> {
        const car_part = await this.repo.find({ where: { car_part_name: ILike(car_part_name) } });
        if (!car_part) throw new ConflictException('No car-part found with this name')
        return car_part
    }

    async getAllCarParts(): Promise<CarParts[]> {
        return await this.repo.find();
    }
}
