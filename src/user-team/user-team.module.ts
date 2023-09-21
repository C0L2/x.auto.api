import { Module } from '@nestjs/common';
import { UserTeamController } from './user-team.controller';
import { UserTeamService } from './user-team.service';

@Module({
  controllers: [UserTeamController],
  providers: [UserTeamService]
})
export class UserTeamModule {}
