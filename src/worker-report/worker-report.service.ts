import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Between, EntityManager, Repository } from 'typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { CarPart, MechanicReport, Report } from 'src/types';
import { WorkerService } from 'src/worker/worker.service';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';

@Injectable()
export class WorkerReportService {
    constructor(@InjectRepository(WorkerReport) private repo: Repository<WorkerReport>,
        @InjectRepository(AssignedServices) private assignedRepo: Repository<AssignedServices>,
        @InjectRepository(AssignedCarParts) private assignedcarPartRepo: Repository<AssignedCarParts>,
        private workerServis: WorkerService) { }

    async createWorkerReportWithServices(
        worker_id: number,
        car_id: number,
        date: Date,
        serviceIds: number[],
        carpartIds: number[],
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

            const assignedCarParts = carpartIds.map(carpartId => {
                const assignedCarPart = new AssignedCarParts();
                assignedCarPart.report_id = createdReport.report_id;
                assignedCarPart.car_part_id = carpartId;
                return assignedCarPart;
            });

            await transactionalEntityManager.save(AssignedServices, assignedServices);
            await transactionalEntityManager.save(AssignedCarParts, assignedCarParts);

            return createdReport;
        });
    }

    async getWorkerReportWithServices(report_id: number) {
        const workerReport = await this.repo.findOne(report_id, {
            relations: ['report', 'report.assignedService', 'carpart', 'carpart.assignedCarParts'],
        });
        console.log(workerReport)

        if (!workerReport) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }

        const worker = await this.workerServis.findById(workerReport.worker_id);

        const mapReport = (item: Report) => ({
            report_id: item.report_id,
            price: item.price,
            assignedService: {
                service_id: item.assignedService.service_id,
                service_name: item.assignedService.service_name,
            },
        });

        const mapPart = (item: CarPart) => ({
            report_id: item.report_id,
            price: item.price,
            assignedCarPart: {
                car_part_id: item.assignedCarParts.car_part_id,
                car_part_name: item.assignedCarParts.car_part_name,
            },
        })

        const invoice = {
            report_id: workerReport.report_id,
            worker_full_name: `${worker?.worker_name} ${worker?.worker_surname}`,
            services: workerReport.report.map(mapReport),
            car_parts: workerReport.carpart.map(mapPart)
        };

        return invoice;
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

    async getWorkerReportsDateAndServiceIdByCarId(carId: number): Promise<any[]> {
        return this.repo.createQueryBuilder('wr')
            .select('wr.date', 'date')
            .addSelect('as.service_id', 'service_id')
            .innerJoin('wr.report', 'as')
            .where('wr.car_id = :carId', { carId })
            .getRawMany();
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

    async getWorkerReportsByWorkerId(worker_id: number): Promise<MechanicReport[]> {
        const workerReports = await this.repo.find({
            where: { worker_id },
            relations: ['reports', 'reports.assignedService'],
        });

        const adjustedReports: MechanicReport[] = workerReports.map((report) => ({
            report_id: report.report_id,
            worker_id: report.worker_id,
            car_id: report.car_id,
            date: report.date,
            reports: report.reports.map((assignedService) => ({
                assigned_service_id: assignedService.assigned_service_id,
                price: assignedService.price,
                assignedService: {
                    service_id: assignedService.assignedService.service_id,
                    service_name: assignedService.assignedService.service_name,
                },
            })),
        }));

        return adjustedReports;
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
