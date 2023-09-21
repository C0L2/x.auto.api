import { Controller, Post, Body, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  createTeam(@Body() body: CreateTeamDto, id_user: number) { 
    return this.teamsService.create(body, id_user); // Pasați id-ul utilizatorului curent către serviciu
  }
}
