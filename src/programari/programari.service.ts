import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programari } from '../entities/programari.entity';
import { Between, Repository } from 'typeorm';
import { format, startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class ProgramariService {
    /* constructor(@InjectRepository(Programari) private repo: Repository<Programari>) { }
  
       async create(
           client_id: number,
           client_type: number,
           car_model: string,
           an_fabricare: number,
           problem_description: string,
           registr_date: string) {
           const programare = this.repo.create({
               client_id,
               client_type,
               car_model,
               an_fabricare,
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
           const startDate = startOfDay(currentDate); // Ora 00:00:00 a zilei curente
           const endDate = endOfDay(currentDate);     // Ora 23:59:59 a zilei curente
   
           return this.repo.find({
               where: {
                   registr_date: Between(startDate, endDate),
               },
           });
       } */
}
