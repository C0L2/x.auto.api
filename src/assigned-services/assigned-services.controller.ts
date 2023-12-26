import { Body, Controller, Delete } from '@nestjs/common';
import { AssignedServicesService } from './assigned-services.service';

@Controller('assigned-services')
export class AssignedServicesController {
    constructor(
        private readonly assignedServicesService: AssignedServicesService,
    ) { }

    @Delete('delete-assigned-service')
    async deleteAssignedServices(@Body() requestBody: { report_id: number; assigned_service_ids: number[] }) {
        const { report_id, assigned_service_ids } = requestBody;

        await this.assignedServicesService.deleteAssignedServicesByReportIdAndIds(
            report_id,
            assigned_service_ids,
        );

        return { message: 'Assigned services deleted successfully.' };
    }

}
