import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from './worker.entity';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker) private repo: Repository<Worker>) { }

  async create(
    nume_lucrator: string,
    prenume_lucrator: string,
    email: string,
    numar_telefon: string,
    salary: number,
    role_id: number,
    password: string,
  ): Promise<Worker> {
    const worker = this.repo.create({
      nume_lucrator,
      prenume_lucrator,
      email,
      numar_telefon,
      salary,
      role_id,
      password,
    });

    return await this.repo.save(worker);
  }


  async update(worker_id: number, attrs: Partial<Worker>) {
    const user = await this.findById(worker_id);
    if (!user) {
      throw new Error('worker not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(worker_id: number) {
    const user = await this.repo.findOne({ where: { worker_id } });
    if (!user) {
      throw new Error('worker not found');
    }
    return this.repo.remove(user);
  }

  getAllWorkers(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findById(worker_id: number) {
    return await this.repo.findOne({ where: { worker_id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
