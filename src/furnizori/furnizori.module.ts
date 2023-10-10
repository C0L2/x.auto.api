import { Module } from '@nestjs/common';
import { FurnizorService } from './furnizori.service';
import { FurnizorController } from './furnizori.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Furnizori } from './furnnizori.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Furnizori])],
  controllers: [FurnizorController],
  providers: [FurnizorService]
})
export class FurnizoriModule { }
