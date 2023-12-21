import { Module } from '@nestjs/common';
import { AssignedCarPartsService } from './assigned-carparts.service';
import { AssignedCarpartsController } from './assigned-carparts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerReportService } from 'src/worker-report/worker-report.service';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { WorkerModule } from 'src/worker/workers.module';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
import { AssignedServices } from 'src/entities/assigned-services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedCarParts, AssignedServices, WorkerReport]), WorkerModule],
  providers: [AssignedCarPartsService, WorkerReportService],
  controllers: [AssignedCarpartsController]
})
export class AssignedCarPartsModule { }
