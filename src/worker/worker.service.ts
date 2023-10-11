import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Worker } from '../entities/worker.entity';
import { Role } from 'src/entities/role.entity';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker) private repo: Repository<Worker>) { }

  async create(
    worker_name: string,
    worker_surname: string,
    email: string,
    password: string,
    role_id: number
  ): Promise<Worker> {
    const worker = this.repo.create({
      worker_name,
      worker_surname,
      email,
      password,
      role_id
    });

    return await this.repo.save(worker);
  }


  async update(worker_id: number, attrs: Partial<Worker>) {
    const worker = await this.findById(worker_id);
    if (!worker) {
      throw new Error('worker not found');
    }
    Object.assign(worker, attrs);

    return this.repo.save(worker);
  }

  async remove(worker_id: number) {
    const worker = await this.repo.findOne({ where: { worker_id } });
    if (!worker) {
      throw new Error('worker not found');
    }
    return this.repo.remove(worker);
  }

  async findById(worker_id: number) {
    return await this.repo.findOne({ where: { worker_id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async getAllWorkers(): Promise<Worker[]> {
    return await this.repo.find();
  }
}
