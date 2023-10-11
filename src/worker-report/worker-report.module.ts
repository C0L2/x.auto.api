import { Module } from '@nestjs/common';
import { WorkerReportController } from './worker-report.controller';
import { WorkerReportService } from './worker-report.service';

@Module({
  controllers: [WorkerReportController],
  providers: [WorkerReportService]
})
export class WorkerReportModule {}
