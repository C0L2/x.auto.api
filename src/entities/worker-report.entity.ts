import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Services } from './services.entity';
import { Masini } from './masini.entity';
import { Worker } from './worker.entity';

@Entity()
export class WorkerReport {
    @PrimaryGeneratedColumn()
    report_id: number;

    @Column()
    worker_id: number;

    @Column()
    car_id: number;

    @Column()
    service_id: number

    @Column({ type: 'timestamp' })
    date: Date;

    @OneToMany(() => Services, (services) => services.services_report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "service_id" })
    report_services: Services[];

    @ManyToOne(() => Worker, (worker) => worker.worker_report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "worker_id" })
    worker: Worker;

    @OneToOne(() => Masini)
    @JoinColumn({ name: "car_id" })
    masina: Masini
}
