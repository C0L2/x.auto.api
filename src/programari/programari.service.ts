import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programari } from '../entities/programari.entity';
import { Between, Repository } from 'typeorm';
import { startOfWeek, addDays, isAfter, startOfDay, endOfDay, endOfMonth } from 'date-fns';
import { CreateProgramareDto } from './dto/create-programare.dto';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class ProgramariService {
    constructor(@InjectRepository(Programari) private repo: Repository<Programari>, private clientService: ClientService) { }

    async create(createProgramareDto: CreateProgramareDto) {
        const { programare_name, programare_date, description, client_id } = createProgramareDto;

        let client;

        if (client_id) {
            client = await this.clientService.findById(client_id);

            if (!client) {
                throw new NotFoundException(`Client with ID ${client_id} not found`);
            }
        }

        const programare = this.repo.create({
            programare_name,
            programare_date,
            description,
            client,
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
                programare_date: Between(startDate, endDate),
            },
        });
    }

    async getProgramariForToday(): Promise<Programari[]> {
        const startDate = startOfDay(new Date());
        const endDate = endOfDay(new Date());

        return await this.repo.find({
            where: {
                programare_date: Between(startDate, endDate),
            },
        });
    }

    async getProgramariForTomorrow(): Promise<Programari[]> {
        const tomorrow = addDays(new Date(), 1);
        const startDate = startOfDay(tomorrow);
        const endDate = endOfDay(tomorrow);

        return await this.repo.find({
            where: {
                programare_date: Between(startDate, endDate),
            },
        });
    }

    async getProgramariForCurrentWeek(): Promise<Programari[]> {
        const today = new Date();
        const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });

        return this.repo
            .createQueryBuilder('programari')
            .where('programari.programare_date >= :startOfCurrentWeek', { startOfCurrentWeek })
            .getMany();
    }

    async getProgramariForNextWeek(): Promise<Programari[]> {
        const today = new Date();
        const startOfNextWeek = startOfWeek(addDays(today, 7), { weekStartsOn: 1 });

        return this.repo
            .createQueryBuilder('programari')
            .where('programari.programare_date >= :startOfNextWeek', { startOfNextWeek })
            .getMany();
    }

    async getProgramariForCurrentMonth(): Promise<Programari[]> {
        const today = new Date();
        const startOfCurrentMonth = startOfDay(today);
        const endOfCurrentMonth = endOfMonth(today);

        return this.repo
            .createQueryBuilder('programari')
            .where('programari.programare_date >= :startOfCurrentMonth', { startOfCurrentMonth })
            .andWhere('programari.programare_date <= :endOfCurrentMonth', { endOfCurrentMonth })
            .getMany();
    }
}
