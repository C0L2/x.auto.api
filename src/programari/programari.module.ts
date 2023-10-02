import { Module } from '@nestjs/common';
import { ProgramariController } from './programari.controller';
import { ProgramariService } from './programari.service';

@Module({
  controllers: [ProgramariController],
  providers: [ProgramariService]
})
export class ProgramariModule {}
