import { Module, forwardRef } from '@nestjs/common';
import { WorkerReportController } from './worker-report.controller';
import { WorkerReportService } from './worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { Worker } from 'src/entities/worker.entity';
import { WorkerModule } from 'src/worker/workers.module';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
import { Masini } from 'src/entities/masini.entity';
import { MasiniModule } from 'src/masini/masini.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerReport, AssignedServices, AssignedCarParts, Worker, Masini]), MasiniModule, WorkerModule],
  controllers: [WorkerReportController],
  providers: [WorkerReportService]
})
export class WorkerReportModule { }
