import { Module } from '@nestjs/common';
import { WorkerReportController } from './worker-report.controller';
import { WorkerReportService } from './worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerReport])],
  controllers: [WorkerReportController],
  providers: [WorkerReportService]
})
export class WorkerReportModule { }
