import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignedServicesService {
    constructor(
        @InjectRepository(AssignedServices)
        private readonly assignedServicesRepository: Repository<AssignedServices>,
        @InjectRepository(WorkerReport)
        private readonly workerReportRepository: Repository<WorkerReport>,
    ) { }

    async deleteAssignedService(assigned_service_id: number) {
        const assignedService = await this.assignedServicesRepository.findOne(assigned_service_id);

        if (!assignedService) {
            throw new NotFoundException(`Assigned service with id ${assigned_service_id} not found.`);
        }

        const reportId = assignedService.report_id;

        await this.assignedServicesRepository.remove(assignedService);

        const report = await this.workerReportRepository.findOne(reportId, { relations: ['report'] });

        if (report) {
            report.report = report.report.filter((service) => service.assigned_service_id !== assigned_service_id);
            await this.workerReportRepository.save(report);
        } else {
            throw new NotFoundException(`Worker report with id ${reportId} not found.`);
        }
    }
}
