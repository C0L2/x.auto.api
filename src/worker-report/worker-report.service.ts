import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Repository } from 'typeorm';
import { CreateWorkerReportDto } from './dto/create-worker-report.dto';
import { Services } from 'src/entities/services.entity';

@Injectable()
export class WorkerReportService {
    constructor(@InjectRepository(WorkerReport) private repo: Repository<WorkerReport>) { }
    /* 
        async createWorkerReport(workerReportDTO: CreateWorkerReportDto): Promise<WorkerReport> {
            const workerReport = new WorkerReport();
            workerReport.worker_id = workerReportDTO.worker_id;
            workerReport.car_id = workerReportDTO.car_id;
            workerReport.date = new Date(workerReportDTO.date);
    
            workerReport.services = workerReportDTO.service_ids.map((serviceId) => {
                const service = new Services();
                service.service_id = serviceId;
                return service;
            });
    
            return await this.repo.save(workerReport);
        } */

    async getWorkerReportByIdWithServices(reportId: number): Promise<WorkerReport> {
        const report = await this.repo
            .createQueryBuilder('workerReport')
            .leftJoinAndSelect('workerReport.services', 'services')
            .where('workerReport.report_id = :reportId', { reportId })
            .getOne();

        if (!report) {
            throw Error('No data found')
        }

        return report
    }


    async findReportByWorkerId(worker_id: number) {
        const report = await this.repo.findOne({ where: { worker_id } });

        if (report) {
            return report;
        }

        return new NotFoundException(`Worker's reports was not found`);
    }

    async getAllReports(): Promise<WorkerReport[]> {
        return await this.repo.find();
    }

    async remove(report_id: number) {
        const report = await this.repo.findOne({ where: { report_id } });
        if (!report) {
            throw new Error('This report was not found');
        }
        return this.repo.remove(report);
    }
}
