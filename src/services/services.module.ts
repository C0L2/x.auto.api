import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Services } from '../entities/services.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Services, AssignedServices])],
  providers: [ServicesService],
  controllers: [ServicesController],
})
export class ServicesModule { }
