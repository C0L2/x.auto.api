import { Module } from '@nestjs/common';
import { AssignedServicesService } from './assigned-services.service';
import { AssignedServicesController } from './assigned-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { WorkerReportService } from 'src/worker-report/worker-report.service';
import { WorkerModule } from 'src/worker/workers.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedServices, WorkerReport]), WorkerModule],
  providers: [AssignedServicesService, WorkerReportService],
  controllers: [AssignedServicesController]
})
export class AssignedServicesModule { }
