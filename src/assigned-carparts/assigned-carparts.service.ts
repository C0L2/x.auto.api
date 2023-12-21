import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignedCarPartsService {
    constructor(
        @InjectRepository(AssignedCarParts)
        private readonly assignedCarPartsRepository: Repository<AssignedCarParts>,
        @InjectRepository(WorkerReport)
        private readonly workerReportRepository: Repository<WorkerReport>,
    ) { }

    async deleteAssignedCarPart(assigned_carpart_id: number) {
        const assignedCarPart = await this.assignedCarPartsRepository.findOne(assigned_carpart_id);

        if (!assignedCarPart) {
            throw new NotFoundException(`Assigned car-part with id ${assigned_carpart_id} not found.`);
        }

        const reportId = assignedCarPart.report_id;

        await this.assignedCarPartsRepository.remove(assignedCarPart);

        const report = await this.workerReportRepository.findOne(reportId, { relations: ['carpart'] });

        if (report) {
            report.carpart = report.carpart.filter((carpart) => carpart.assigned_carpart_id !== assigned_carpart_id);
            await this.workerReportRepository.save(report);
        } else {
            throw new NotFoundException(`Worker report with id ${reportId} not found.`);
        }
    }
}
