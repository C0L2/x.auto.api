import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { WorkerReportService } from './worker-report.service';
import { CreateWorkerReportDto } from './dto/create-worker-report.dto';
import { getManager } from "typeorm"
import { SetUpdatePricesPerReportDto } from './dto/update-price-worker-report.dto';

@ApiTags('Worker Report')
@Controller('worker-report')
export class WorkerReportController {
    constructor(private wkService: WorkerReportService) { }

    @Post('create-new-worker-report')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                worker_id: {
                    type: 'number',
                    example: '7'
                },
                car_id: {
                    type: 'number',
                    example: '7'
                },
                service_id: {
                    type: 'number',
                    example: '7'
                },
                date: {
                    type: 'string',
                    example: 'date-type'
                }
            }
        }
    })
    async createWorkerReport(@Body() body: CreateWorkerReportDto) {
        const entityManager = getManager();
        const newReport = await this.wkService.createWorkerReportWithServices(
            body.worker_id,
            body.car_id,
            body.report_date,
            body.service_ids,
            body.carparts_ids,
            entityManager,
        );

        return newReport;
    }

    @Get("get-by-report-id/:report_id")
    async getByReportId(@Param('report_id') report_id: number) {
        const workerReport = await this.wkService.getWorkerReportWithServices(report_id);
        return workerReport;
    }

    @Get('worker/:worker_id')
    async getWorkerReportsByWorkerId(@Param('worker_id') worker_id: number) {
        const workerReports = await this.wkService.getWorkerReportsByWorkerId(worker_id);
        return workerReports;
    }

    @Get('worker/:worker_id/date-range/:startDate/:endDate')
    async getWorkerReportsByDateRange(
        @Param('worker_id') worker_id: number,
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
    ) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const workerReports = await this.wkService.getWorkerReportsByDateRange(worker_id, startDateObj, endDateObj);
        return workerReports;
    }

    @Get(':carId/date-and-service-id')
    async getWorkerReportsDateAndServiceIdByCarId(@Param('carId') carId: number) {
        return this.wkService.getWorkerReportsDateAndServiceIdByCarId(carId);
    }

    @Patch(':id/update-price')
    async updatePriceForAssignedServices(
        @Param('id') report_id: number,
        @Body() updatePriceDto: SetUpdatePricesPerReportDto,
    ) {
        const updatedServices = await this.wkService.updatePriceForAssignedServices(report_id, updatePriceDto.serviceIds, updatePriceDto.price);
        const updatedCarParts = await this.wkService.updatePriceForAssignedCarParts(report_id, updatePriceDto.carpartsService, updatePriceDto.carpartsPrice);

        return {
            message: 'Prices updated successfully',
            updatedServices: updatedServices,
            updatedCarParts: updatedCarParts,
        };;
    }

    @Delete('delete-worker-report/:report_id')
    async deleteWorkerReportWithServices(@Param('report_id') report_id: number) {
        await this.wkService.deleteWorkerReportWithServices(report_id);

        return { message: `successfully deleted worker-report with id ${report_id}` }
    }

}
