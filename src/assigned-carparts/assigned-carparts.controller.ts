import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AssignedCarPartsService } from './assigned-carparts.service';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';

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

    @Post(':report_id')
    async createAssignedCarParts(
        @Param('report_id', ParseIntPipe) report_id: number,
        @Body() carPartIdsObject: { carPartIds: number[] },
    ) {
        const result = await this.assignedCarPartsService.createAssignedCarParts(report_id, carPartIdsObject);
        return { message: 'Assigned car parts created successfully.', result };
    }
}
