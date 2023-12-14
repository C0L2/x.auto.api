import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programari } from '../entities/programari.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class ProgramariService {
    constructor(@InjectRepository(Programari) private repo: Repository<Programari>) { }

    async create(
        programare_name: string,
        registr_date: string) {
        const programare = this.repo.create({
            programare_name,
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

    async getProgramariForToday(): Promise<Programari[]> {
        const currentDate = new Date();
        const startDate = startOfDay(currentDate);
        const endDate = endOfDay(currentDate);

        const programari = await this.repo.find({
            where: {
                registr_date: Between(startDate, endDate),
            },
        });
        return programari;
    }

}
