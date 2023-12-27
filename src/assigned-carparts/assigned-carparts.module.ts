import { Module } from '@nestjs/common';
import { AssignedCarPartsService } from './assigned-carparts.service';
import { AssignedCarpartsController } from './assigned-carparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerReportService } from 'src/worker-report/worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { WorkerModule } from 'src/worker/workers.module';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { MasiniModule } from 'src/masini/masini.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedCarParts, AssignedServices, WorkerReport]), MasiniModule, WorkerModule, ClientModule],
  providers: [AssignedCarPartsService, WorkerReportService],
  controllers: [AssignedCarpartsController]
})
export class AssignedCarPartsModule { }
