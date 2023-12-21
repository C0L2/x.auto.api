import { Controller, Delete, Param } from '@nestjs/common';
import { AssignedCarPartsService } from './assigned-carparts.service';

@Controller('assigned-carparts')
export class AssignedCarpartsController {

    constructor(
        private readonly assignedCarPartsService: AssignedCarPartsService,
    ) { }

    @Delete('delete-assigned-car-part/:assigned_carpart_id')
    async deleteAssignedService(@Param('assigned_carpart_id') assigned_carpart_id: number) {
        const reportId = await this.assignedCarPartsService.deleteAssignedCarPart(assigned_carpart_id);
        return { message: `Assigned car part with id ${assigned_carpart_id} has been deleted from WorkerReport ${reportId}.` };
    }
}
