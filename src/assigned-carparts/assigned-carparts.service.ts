import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
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

    async createAssignedCarParts(report_id: number, carPartIdsObject: { carPartIds: number[] }): Promise<AssignedCarParts[]> {
        const assignedCarPartsList: AssignedCarParts[] = [];

        const carPartIds = carPartIdsObject.carPartIds;

        if (!Array.isArray(carPartIds)) {
            throw new BadRequestException('carPartIds must be an array.');
        }

        for (const carPartId of carPartIds) {
            const assignedCarPart = this.assignedCarPartsRepository.create({
                report_id,
                car_part_id: carPartId,
            });

            if (!(assignedCarPart instanceof AssignedCarParts)) {
                throw new NotFoundException(`Assigned car part with ID ${carPartId} not found.`);
            }

            const savedAssignedCarPart = await this.assignedCarPartsRepository.save(assignedCarPart);
            assignedCarPartsList.push(savedAssignedCarPart);
        }

        return assignedCarPartsList;
    }


}
