import { Module } from '@nestjs/common';
import { WorkerReportController } from './worker-report.controller';
import { WorkerReportService } from './worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerReport, AssignedServices])],
  controllers: [WorkerReportController],
  providers: [WorkerReportService]
})
export class WorkerReportModule { }
