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
    ) { }

    async deleteAssignedCarPartsByReportIdAndIds(report_id: number, assignedCarPartsIds: number[]) {
        for (const assignedCarPartId of assignedCarPartsIds) {
            const assignedCarPartToDelete = await this.assignedCarPartsRepository.findOne({
                where: {
                    report_id,
                    assigned_carpart_id: assignedCarPartId,
                },
            });

            if (!assignedCarPartToDelete) {
                throw new NotFoundException(`Assigned service with ID ${assignedCarPartId} not found.`);
            }

            await this.assignedCarPartsRepository.remove(assignedCarPartToDelete);
        }
    }
}
