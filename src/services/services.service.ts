import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles Routes')
@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Services) private repo: Repository<Services>) { }

  async create(service_name: string, service_price: number) {
    const service = this.repo.create({
      service_name,
      service_price,
    });
    return this.repo.save(service);
  }

  async getAll(): Promise<Services[]> {
    return await this.repo.find();
  }

  async findByName(service_name: string) {
    return await this.repo.findOne({ where: { service_name } });
  }

  async remove(service_id: number) {
    const role = await this.repo.findOne({ where: { service_id } });
    if (!role) {
      throw new Error('This service not found');
    }
    return this.repo.remove(role);
  }
}
