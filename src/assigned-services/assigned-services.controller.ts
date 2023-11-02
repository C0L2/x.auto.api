import { Controller, Delete, Param } from '@nestjs/common';
import { AssignedServicesService } from './assigned-services.service';

@Controller('assigned-services')
export class AssignedServicesController {
    constructor(
        private readonly assignedServicesService: AssignedServicesService,
    ) { }

    @Delete('delete-assigned-service/:assigned_service_id')
    async deleteAssignedService(@Param('assigned_service_id') assigned_service_id: number) {
        const reportId = await this.assignedServicesService.deleteAssignedService(assigned_service_id);
        return { message: `Assigned service with id ${assigned_service_id} has been deleted from WorkerReport ${reportId}.` };
    }

}
