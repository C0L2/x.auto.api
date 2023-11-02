import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { WorkerReportService } from './worker-report.service';
import { CreateWorkerReportDto } from './dto/create-worker-report.dto';
import { EntityManager, getManager } from "typeorm"

@ApiTags('Worker Report')
@Controller('worker-report')
export class WorkerReportController {
    constructor(private wkService: WorkerReportService/* , private masiniService: MasiniService */) { }

    @Post(`get-specific's-worker-report/:worker_id`)
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                worker_id: {
                    type: 'number',
                    example: '7'
                }
            }
        }
    })
    async findWorkersReportByWorkerId(@Param('worker_id') worker_id: number) {
        const report = await this.wkService.findReportByWorkerId(worker_id)

        if (!report) {
            throw new NotFoundException('No found reports for this worker')
        }
        return report;
    }



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
            entityManager,
        );

        return newReport;
    }

    @Get("get-by-report-id/:report_id")
    async getByReportId(@Param('report_id') report_id: number) {
        const workerReport = await this.wkService.getWorkerReportWithServices(report_id);
        return workerReport;
    }

    @Patch(':id/update-price')
    async updatePriceForAssignedServices(
        @Param('id') report_id: number,
        @Body() updatePriceDto: { serviceIds: number[], price: number[] },
    ) {
        const updatedServices = await this.wkService.updatePriceForAssignedServices(report_id, updatePriceDto.serviceIds, updatePriceDto.price);

        const response = {
            message: 'Prices updated successfully',
            updatedServices: updatedServices,
        };

        return response;
    }

    @Delete('delete-worker-report/:report_id')
    async deleteWorkerReportWithServices(@Param('report_id') report_id: number) {
        await this.wkService.deleteWorkerReportWithServices(report_id);

        return { message: `successfully deleted worker-report with id ${report_id}` }
    }

}
