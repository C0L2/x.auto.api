import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkerReportService {
    constructor(@InjectRepository(WorkerReport) private repo: Repository<WorkerReport>) { }

    async create(
        worker_id: number,
        car_id: number,
        service_id: number) {
        const report = this.repo.create({
            worker_id,
            car_id,
            service_id
        });
        return this.repo.save(report);
    }

    async findReportById(report_id: number) {
        return await this.repo.findOne({ where: { report_id } })
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
