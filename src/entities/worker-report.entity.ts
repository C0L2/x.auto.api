import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { Masini } from './masini.entity';
import { Worker } from './worker.entity';
import { AssignedServices } from './assigned-services.entity';

@Entity()
export class WorkerReport {
    @PrimaryGeneratedColumn()
    report_id: number;

    @Column()
    worker_id: number;

    @Column()
    car_id: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @ManyToOne(() => Worker, (worker) => worker.worker_report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "worker_id" })
    worker: Worker;

    @ManyToOne(() => Masini, (masina) => masina.work_report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "car_id" })
    masina: Masini

    @OneToMany(() => AssignedServices, (report) => report.servicesFromReport, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "report_id" })
    report: AssignedServices[]

    @OneToMany(() => AssignedServices, (assignedService) => assignedService.servicesFromReport)
    reports: AssignedServices[];
}
