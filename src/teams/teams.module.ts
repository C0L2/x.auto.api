import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team } from './team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User])],
  controllers: [TeamsController],
  providers: [TeamsService, JwtService, UsersService],
})
export class TeamsModule {}
