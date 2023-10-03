import { Module } from '@nestjs/common';
import { MasiniController } from './masini.controller';
import { MasiniService } from './masini.service';

@Module({
  controllers: [MasiniController],
  providers: [MasiniService]
})
export class MasiniModule {}
