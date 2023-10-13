import { Client } from 'src/entities/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { WorkerReport } from './worker-report.entity';

@Entity()
export class Masini {
    @PrimaryGeneratedColumn()
    car_id: number;

    @Column({ type: 'integer', default: 0 })
    client_id: number;

    @Column()
    model: string;

    @Column()
    registration_number: string;

    @Column()
    vin_code: string;

    @Column()
    culoare: string;

    @Column()
    km: number;

    @ManyToOne(() => Client, (client) => client.car, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "client_id" })
    client: Client

    @OneToOne(() => WorkerReport, (work_report) => work_report.masina)
    raport: WorkerReport;
}
