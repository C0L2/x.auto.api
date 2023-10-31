import { Body, Controller, Delete, Get, NotFoundException, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { WorkerReportService } from './worker-report.service';
import { CreateWorkerReportDto } from './dto/create-worker-report.dto';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { MasiniService } from 'src/masini/masini.service';

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



    /*  @Post('create-new-worker-report')
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
     async createWorkerReport(@Body() workerReportDTO: CreateWorkerReportDto) {
         const createdWorkerReport = await this.wkService.createWorkerReport(workerReportDTO);
         return createdWorkerReport;
     } */

    @Get("get-by-report-id/:report_id")
    async getByReportId(@Param('report_id') report_id: number) {
        const reportData = await this.wkService.getWorkerReportByIdWithServices(report_id)
        return { reportData }
    }

    @Delete('delete-worker-report/:report_id')
    async removeWorkerReport(@Param('report_id') report_id: number) {
        await this.wkService.remove(report_id);
        return { message: `Successfully deleted worker-report with id of: ${report_id}` };
    }
}
