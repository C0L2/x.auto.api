import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { WorkerReportService } from './worker-report.service';
import { CreateWorkerReportDto } from './dto/create-worker-report.dto';
import { WorkerReport } from 'src/entities/worker-report.entity';

@ApiTags('Worker Report')
@Controller('worker-report')
export class WorkerReportController {
    constructor(private wkService: WorkerReportService) { }

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
        const worker_report = await this.wkService.create(body.worker_id, body.car_id, body.service_id, body.date);
        return { message: 'Successfully added new worker-report in list', worker_report: body };
    }

    @Delete('delete-worker-report/:report_id')
    async removeWorkerReport(@Param('report_id') report_id: number) {
        await this.wkService.remove(report_id);
        return { message: `Successfully deleted worker-report with id of: ${report_id}` };
    }
}
