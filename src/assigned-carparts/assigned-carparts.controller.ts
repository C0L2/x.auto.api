import { Body, Controller, Delete, Param } from '@nestjs/common';
import { AssignedCarPartsService } from './assigned-carparts.service';

@Controller('assigned-carparts')
export class AssignedCarpartsController {

    constructor(
        private readonly assignedCarPartsService: AssignedCarPartsService,
    ) { }

    @Delete('delete-assigned-car-part')
    async deleteAssignedServices(@Body() requestBody: { report_id: number; assigned_carparts_ids: number[] }) {
        const { report_id, assigned_carparts_ids } = requestBody;

        await this.assignedCarPartsService.deleteAssignedCarPartsByReportIdAndIds(
            report_id,
            assigned_carparts_ids,
        );

        return { message: 'Assigned carparts deleted successfully.' };
    }
}
