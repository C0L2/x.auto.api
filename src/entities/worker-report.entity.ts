import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
