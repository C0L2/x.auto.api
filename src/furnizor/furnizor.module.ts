import { Module } from '@nestjs/common';
import { FurnizorService } from './furnizor.service';
import { FurnizorController } from './furnizor.controller';

@Module({
  providers: [FurnizorService],
  controllers: [FurnizorController]
})
export class FurnizorModule {}
