import { Module, forwardRef } from '@nestjs/common';
import { WorkerReportController } from './worker-report.controller';
import { WorkerReportService } from './worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { WorkerService } from 'src/worker/worker.service';
import { Worker } from 'src/entities/worker.entity';
import { WorkerModule } from 'src/worker/workers.module';
import { AssignedServicesService } from 'src/assigned-services/assigned-services.service';
import { AssignedServicesModule } from 'src/assigned-services/assigned-services.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerReport, AssignedServices, Worker]), WorkerModule],
  controllers: [WorkerReportController],
  providers: [WorkerReportService]
})
export class WorkerReportModule { }
