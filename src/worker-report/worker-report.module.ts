import { Module } from '@nestjs/common';
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
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';
import { Client } from 'src/entities/client.entity';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([WorkerReport, AssignedServices, AssignedCarParts, Worker, Masini, Client]), ClientModule, MasiniModule, WorkerModule],
  controllers: [WorkerReportController, InvoiceController],
  providers: [WorkerReportService, InvoiceService]
})
export class WorkerReportModule { }
