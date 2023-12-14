import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private repo: Repository<Role>) { }

  async create(role_name: string) {
    const role = this.repo.create({
      role_name,
    });
    return this.repo.save(role);
  }

  async findRoleById(role_id: number) {
    return await this.repo.findOne({ where: { role_id } })
  }

  async getAll(): Promise<Role[]> {
    return await this.repo.find();
  }

  async findRoleByName(role_name: string) {
    return await this.repo.findOne({ where: { role_name } });
  }

  async remove(role_id: number) {
    const role = await this.repo.findOne({ where: { role_id } });
    if (!role) {
      throw new Error('This role not found');
    }
    return this.repo.remove(role);
  }
}
