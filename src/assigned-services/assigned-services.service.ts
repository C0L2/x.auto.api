import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignedServicesService {
    constructor(
        @InjectRepository(AssignedServices)
        private readonly assignedServicesRepository: Repository<AssignedServices>,
    ) { }

    async deleteAssignedServicesByReportIdAndIds(report_id: number, assignedServiceIds: number[]) {
        for (const assignedServiceId of assignedServiceIds) {
            const assignedServiceToDelete = await this.assignedServicesRepository.findOne({
                where: {
                    report_id,
                    assigned_service_id: assignedServiceId,
                },
            });

            if (!assignedServiceToDelete) {
                throw new NotFoundException(`Assigned service with ID ${assignedServiceId} not found.`);
            }

            await this.assignedServicesRepository.remove(assignedServiceToDelete);
        }
    }
}
