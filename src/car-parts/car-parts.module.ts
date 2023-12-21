import { Module } from '@nestjs/common';
import { CarPartsController } from './car-parts.controller';
import { CarPartsService } from './car-parts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarParts } from 'src/entities/car-parts.entity';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarParts, AssignedCarParts])],
  providers: [CarPartsService],
  controllers: [CarPartsController]
})
export class CarPartsModule { }