// teams.service.ts

import { Injectable, Session } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { Team } from './team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    private userService: UsersService,
  ) {}

  async create(teamDto: CreateTeamDto, @Session() session: any) {
    const userId = session.user.id_user;

    const user = await this.userService.findById(userId);

      const team = this.teamRepository.create({
        ...teamDto,
        user,
      });

      await this.teamRepository.save(team);

      return team;
    } 
  }

