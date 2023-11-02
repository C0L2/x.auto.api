import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Between, EntityManager, Repository } from 'typeorm';

import { AssignedServices } from 'src/entities/assigned-services.entity';
import { Services } from 'src/entities/services.entity';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class WorkerReportService {
    constructor(@InjectRepository(WorkerReport) private repo: Repository<WorkerReport>,
        @InjectRepository(AssignedServices) private assignedRepo: Repository<AssignedServices>) { }

    async createWorkerReportWithServices(
        worker_id: number,
        car_id: number,
        date: Date,
        serviceIds: number[],
        entityManager: EntityManager,
    ) {
        return await entityManager.transaction(async transactionalEntityManager => {
            const newReport = new WorkerReport()
            newReport.worker_id = worker_id
            newReport.car_id = car_id;
            newReport.date = date;

            const createdReport = await transactionalEntityManager.save(newReport);

            const assignedServices = serviceIds.map(serviceId => {
                const assignedService = new AssignedServices();
                assignedService.report_id = createdReport.report_id;
                assignedService.service_id = serviceId;
                return assignedService;
            });

            await transactionalEntityManager.save(AssignedServices, assignedServices);

            return createdReport;
        });
    }

    async getWorkerReportWithServices(report_id: number): Promise<WorkerReport | undefined> {
        const workerReport = await this.repo.findOne(report_id, {
            relations: ['report'],
        });

        if (!workerReport) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }

        return workerReport
    }

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

    async getWorkerReportsByCarId(carId: number): Promise<number[]> {
        const reports = await this.repo
            .createQueryBuilder('workerReport')
            .leftJoinAndSelect('workerReport.report', 'assignedService')
            .where('workerReport.car_id = :carId', { carId })
            .getMany();

        if (reports) {
            const serviceIds: number[] = [];

            for (const report of reports) {
                for (const assignedService of report.report) {
                    if (assignedService.service_id) {
                        serviceIds.push(assignedService.service_id);
                    }
                }
            }

            return serviceIds;
        }

        return [];
    }

    async getWorkerReportsByDateRange(worker_id: number, startDate: Date, endDate: Date): Promise<WorkerReport[]> {
        return this.repo.find({
            where: {
                worker_id,
                date: Between(startDate, endDate)
            },
            relations: ['reports'],
        });
    }

    async getWorkerReportsByWorkerId(worker_id: number): Promise<WorkerReport[]> {
        return this.repo.find({
            where: { worker_id },
            relations: ['reports']
        });
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

    async updatePriceForAssignedServices(report_id: number, serviceIds: number[], prices: number[]): Promise<{ serviceId: number, price: number }[]> {
        const report = await this.repo.findOne(report_id, {
            relations: ['report'],
        });

        if (!report) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }

        if (serviceIds.length !== prices.length) {
            throw new BadRequestException('The number of serviceIds should match the number of prices.');
        }

        const updatedServices = [];

        for (let i = 0; i < serviceIds.length; i++) {
            const serviceId = serviceIds[i];
            const price = prices[i];

            await this.repo
                .createQueryBuilder()
                .update(AssignedServices)
                .set({ price: price })
                .where("report_id = :report_id AND service_id = :serviceId", { report_id, serviceId })
                .execute();

            updatedServices.push({ serviceId, price });
        }

        return updatedServices;
    }


    async remove(report_id: number) {
        const report = await this.repo.findOne({ where: { report_id } });
        if (!report) {
            throw new Error('This report was not found');
        }
        return this.repo.remove(report);
    }

    async deleteWorkerReportWithServices(report_id: number) {
        const report = await this.repo.findOne(report_id, {
            relations: ['report'],
        });

        if (!report) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }
        await this.repo.remove(report);

        await this.assignedRepo
            .createQueryBuilder()
            .delete()
            .from(AssignedServices)
            .where("report_id = :report_id", { report_id })
            .execute();
    }
}
