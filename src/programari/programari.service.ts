import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programari } from './programari.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class ProgramariService {
    constructor(@InjectRepository(Programari) private repo: Repository<Programari>) { }

    async create(
        client_id: number,
        car_model: string,
        problem_description: string,
        registr_date: string) {
        const programare = this.repo.create({
            client_id,
            car_model,
            problem_description,
            registr_date
        });
        return this.repo.save(programare);
    }

    async findProgramareById(programare_id: number) {
        return await this.repo.findOne({ where: { programare_id } })
    }

    async findProgramareByClientId(client_id: number) {
        return await this.repo.find({ where: { client_id } })
    }

    async getAll(): Promise<Programari[]> {
        return await this.repo.find();
    }

    async remove(programare_id: number) {
        const programare = await this.repo.findOne({ where: { programare_id } });
        if (!programare) {
            throw new Error('This programare was not found');
        }
        return this.repo.remove(programare);
    }

    async getProgramariBetweenDates(startDate: string, endDate: string): Promise<Programari[]> {
        return this.repo.find({
            where: {
                registr_date: Between(startDate, endDate),
            },
        });
    }
}
