import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(nickname: string, email: string, password: string) {
    const user = this.repo.create({ nickname, email, password });
    return this.repo.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id_user: number) {
    const user = await this.repo.findOne({ where: { id_user } });
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }

  getAllUsers(email: string) {
    return this.repo.find({ where: { email } });
  }

  async findById(id_user: number) {
    return await this.repo.findOne({ where: { id_user } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findByNickname(nickname: string) {
    return this.repo.findOne({ where: { nickname } });
  }
}
