import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programari } from '../entities/programari.entity';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { startOfDay, endOfDay, addDays } from 'date-fns';

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

    async getAllProgramari() {
        return await this.repo.find()
    }

    async remove(programare_id: number) {
        const programare = await this.repo.findOne({ where: { programare_id } });
        if (!programare) {
            throw new NotFoundException('This appointment was not found');
        }
        await this.repo.remove(programare)
        return { message: 'Appointment deleted successfully' }
    }

    async getProgramariBetweenDates(startDate: string, endDate: string): Promise<Programari[]> {
        return this.repo.find({
            where: {
                registr_date: Between(startDate, endDate),
            },
        });
    }

    async getProgramariForToday(): Promise<Programari[]> {
        const startDate = startOfDay(new Date());
        const endDate = endOfDay(new Date());

        return await this.repo.find({
            where: {
                registr_date: Between(startDate, endDate),
            },
        });
    }

    async getProgramariForTomorrow(): Promise<Programari[]> {
        const tomorrow = addDays(new Date(), 1);
        const startDate = startOfDay(tomorrow);
        const endDate = endOfDay(tomorrow);

        return await this.repo.find({
            where: {
                registr_date: Between(startDate, endDate),
            },
        });
    }

}
