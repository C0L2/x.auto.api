import { Module } from '@nestjs/common';
import { FurnizorService } from './furnizor.service';
import { FurnizorController } from './furnizor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Furnizori } from './furnizor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Furnizori])],
  providers: [FurnizorService],
  controllers: [FurnizorController]
})
export class FurnizorModule { }
