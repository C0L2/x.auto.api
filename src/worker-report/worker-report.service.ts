import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkerReport } from 'src/entities/worker-report.entity';
import { Between, EntityManager, Repository } from 'typeorm';
import { AssignedServices } from 'src/entities/assigned-services.entity';
import { MechanicReport } from 'src/types';
import { WorkerService } from 'src/worker/worker.service';
import { AssignedCarParts } from 'src/entities/assigned-car-parts.entity';
import { mapPart, mapReport } from 'src/utils/process-worker-report';
import { MasiniService } from 'src/masini/masini.service';

@Injectable()
export class WorkerReportService {
    constructor(@InjectRepository(WorkerReport) private repo: Repository<WorkerReport>,
        @InjectRepository(AssignedServices) private assignedServicesRepo: Repository<AssignedServices>,
        @InjectRepository(AssignedCarParts) private assignedcarPartRepo: Repository<AssignedCarParts>,
        private workerServis: WorkerService,
        private masiniService: MasiniService) { }

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

        if (!workerReport) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }

        const worker = await this.workerServis.findById(workerReport.worker_id);

        const invoice = {
            report_id: workerReport.report_id,
            worker_full_name: `${worker?.worker_name} ${worker?.worker_surname}`,
            services: workerReport.report.map(mapReport),
            car_parts: workerReport.carpart ? workerReport.carpart.map(mapPart) : undefined
        };

        return invoice;
    }

    async getWorkerReportsDateAndServiceIdByCarId(vin_code: string) {

        const carPromise = this.masiniService.findCarByVinCode(vin_code);
        const reportsPromise = this.repo.find({
            where: {
                car_id: (await carPromise).car_id,
            },
            relations: ['report', 'report.assignedService', 'carpart', 'carpart.assignedCarParts']
        });

        const [car, reportByCarId] = await Promise.all([carPromise, reportsPromise]);

        return await this.processWorkerReports(reportByCarId);
    }

    async getWorkerReportsByDateRange(worker_id: number, startDate: Date, endDate: Date) {
        const reportList = await this.repo.find({
            where: {
                worker_id,
                date: Between(startDate, endDate),
            },
            relations: ['report', 'report.assignedService', 'carpart', 'carpart.assignedCarParts'],
        });

        return await this.processWorkerReports(reportList);
    }

    async processWorkerReports(workerReports: WorkerReport[]) {
        const processedReports = await Promise.all(
            workerReports.map(async (workerReport) => {
                const worker = await this.workerServis.findById(workerReport.worker_id);

                const report = {
                    report_id: workerReport.report_id,
                    worker_full_name: `${worker?.worker_name} ${worker?.worker_surname}`,
                    services: workerReport.report.map(mapReport),
                    car_parts: workerReport.carpart ? workerReport.carpart.map(mapPart) : undefined,
                };

                return report;
            })
        );

        return processedReports;
    }


    async getWorkerReportsByWorkerId(worker_id: number) {
        const workerReports = await this.repo.find({
            where: { worker_id },
            relations: ['reports', 'reports.assignedService', 'carpart', 'carpart.assignedCarParts'],
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
            carpart: report.carpart.map((assignedCarPart) => ({
                assigned_car_part_id: assignedCarPart.assigned_carpart_id,
                price: assignedCarPart.price,
                assignedCarPart: {
                    car_part_id: assignedCarPart.assignedCarParts.car_part_id,
                    car_part_name: assignedCarPart.assignedCarParts.car_part_name
                }
            }))
        }));

        return adjustedReports;
    }

    async getAllReports() {
        return await this.repo.find({ relations: ['reports', 'reports.assignedService', 'carpart', 'carpart.assignedCarParts'] }
        );
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

    async updatePriceForAssignedCarParts(report_id: number, carpartsIds: number[], prices: number[]): Promise<{ carpartsId: number, price: number }[]> {
        const report = await this.repo.findOne(report_id, {
            relations: ['carpart'],
        });

        if (!report) {
            throw new NotFoundException(`Worker report with id ${report_id} not found.`);
        }

        if (carpartsIds.length !== prices.length) {
            throw new BadRequestException('The number of carpartsIds should match the number of prices.');
        }

        const updatedServices = [];

        for (let i = 0; i < carpartsIds.length; i++) {
            const carpartsId = carpartsIds[i];
            const price = prices[i];

            await this.repo
                .createQueryBuilder()
                .update(AssignedCarParts)
                .set({ price: price })
                .where("report_id = :report_id AND car_part_id = :carpartsId", { report_id, carpartsId })
                .execute();

            updatedServices.push({ carpartsId, price });
        }

        return updatedServices;
    }

    async deleteWorkerReportWithServices(report_id: number) {
        try {
            const report = await this.repo.findOne(report_id, {
                relations: ['report', 'report.assignedService', 'carpart', 'carpart.assignedCarParts'],
            });

            if (!report) {
                throw new NotFoundException(`Worker report with id ${report_id} not found.`);
            }

            await this.repo.remove(report);

            if (report.report) {
                await this.assignedServicesRepo
                    .createQueryBuilder()
                    .delete()
                    .from(AssignedServices)
                    .where("report_id IN (:...reportIds)", { reportIds: report.report.map((r) => r.report_id) })
                    .execute();
            }

            if (report.carpart) {
                await this.assignedcarPartRepo
                    .createQueryBuilder()
                    .delete()
                    .from(AssignedCarParts)
                    .where("report_id IN (:...reportIds)", { reportIds: report.carpart.map((c) => c.report_id) })
                    .execute();
            }

            return { success: true, message: 'Report and associated records deleted successfully.' };
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred while deleting the report.' };
        }
    }


}
