import { Module } from '@nestjs/common';
import { AssignedServicesService } from './assigned-services.service';
import { AssignedServicesController } from './assigned-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedServices])],
  providers: [AssignedServicesService],
  controllers: [AssignedServicesController]
})
export class AssignedServicesModule { }
