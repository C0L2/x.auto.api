import { Module } from '@nestjs/common';
import { AssignedServicesService } from './assigned-services.service';
import { AssignedServicesController } from './assigned-services.controller';

@Module({
  providers: [AssignedServicesService],
  controllers: [AssignedServicesController]
})
export class AssignedServicesModule {}
