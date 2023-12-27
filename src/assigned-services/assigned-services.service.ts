import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async createAssignedServices(report_id: number, carPartIdsObject: { serviceIds: number[] }): Promise<AssignedServices[]> {
        const assignedServiceList: AssignedServices[] = [];

        const serviceIds = carPartIdsObject.serviceIds;

        if (!Array.isArray(serviceIds)) {
            throw new BadRequestException('serviceIds must be an array.');
        }

        for (const serviceId of serviceIds) {
            const assignedService = this.assignedServicesRepository.create({
                report_id,
                service_id: serviceId,
            });

            if (!(assignedService instanceof AssignedServices)) {
                throw new NotFoundException(`Assigned car part with ID ${serviceId} not found.`);
            }

            const savedAssignedCarPart = await this.assignedServicesRepository.save(assignedService);
            assignedServiceList.push(savedAssignedCarPart);
        }

        return assignedServiceList;
    }
}
