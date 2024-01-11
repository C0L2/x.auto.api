import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { startOfWeek, addDays, isAfter, startOfDay, endOfDay, endOfMonth } from 'date-fns';
import { CreateProgramareDto } from './dto/create-programare.dto';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AppointmentService {
    constructor(@InjectRepository(Appointment) private repo: Repository<Appointment>, private clientService: ClientService) { }

    async create(createProgramareDto: CreateProgramareDto) {
        const { appointment_start_date, appointment_finish_date, description, client_id, appointment_name, worker_id } = createProgramareDto;

        let client;
        let worker;

        if (client_id) {
            client = await this.clientService.findById(client_id);

            if (!client) {
                throw new NotFoundException(`Client with ID ${client_id} not found`);
            }
        }

        const appointmen = this.repo.create({
            appointment_name,
            appointment_start_date,
            appointment_finish_date,
            description,
            client_id,
            worker_id
        });

        return this.repo.save(appointmen);
    }


    async getAllAppointment() {
        return await this.repo.find()
    }

    /* async remove(programare_id: number) {
        const programare = await this.repo.findOne({ where: { programare_id } });
        if (!programare) {
            throw new NotFoundException('This appointment was not found');
        }
        await this.repo.remove(programare)
        return { message: 'Appointment deleted successfully' }
    } */

    /* async getAppointmentBetweenDates(startDate: string, endDate: string): Promise<Appointment[]> {
        return this.repo.find({
            where: {
                programare_date: Between(startDate, endDate),
            },
        });
    } */

    /*  async getAppointmentForToday(): Promise<Appointment[]> {
         const startDate = startOfDay(new Date());
         const endDate = endOfDay(new Date());
 
         return await this.repo.find({
             where: {
                 programare_date: Between(startDate, endDate),
             },
         });
     } */

    /* async getAppointmentForTomorrow(): Promise<Appointment[]> {
        const tomorrow = addDays(new Date(), 1);
        const startDate = startOfDay(tomorrow);
        const endDate = endOfDay(tomorrow);

        return await this.repo.find({
            where: {
                programare_date: Between(startDate, endDate),
            },
        });
    } */

    /* async getAppointmentForCurrentWeek(): Promise<Appointment[]> {
        const today = new Date();
        const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });

        return this.repo
            .createQueryBuilder('Appointment')
            .where('Appointment.programare_date >= :startOfCurrentWeek', { startOfCurrentWeek })
            .getMany();
    }

    async getAppointmentForNextWeek(): Promise<Appointment[]> {
        const today = new Date();
        const startOfNextWeek = startOfWeek(addDays(today, 7), { weekStartsOn: 1 });

        return this.repo
            .createQueryBuilder('Appointment')
            .where('Appointment.programare_date >= :startOfNextWeek', { startOfNextWeek })
            .getMany();
    }

    async getAppointmentForCurrentMonth(): Promise<Appointment[]> {
        const today = new Date();
        const startOfCurrentMonth = startOfDay(today);
        const endOfCurrentMonth = endOfMonth(today);

        return this.repo
            .createQueryBuilder('Appointment')
            .where('Appointment.appointment_date >= :startOfCurrentMonth', { startOfCurrentMonth })
            .andWhere('Appointment.appointment_date <= :endOfCurrentMonth', { endOfCurrentMonth })
            .getMany();
    } */
}
