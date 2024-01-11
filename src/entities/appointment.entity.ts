import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';
import { Worker } from './worker.entity';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    appointment_id: number;

    @Column()
    appointment_name: string;

    @Column({ type: 'timestamp' })
    appointment_start_date: Date;

    @Column({ type: 'timestamp' })
    appointment_finish_date: Date;

    @Column({ nullable: true, default: null })
    description: string;

    @Column({ type: 'integer', nullable: true, default: null })
    client_id: number;

    @Column()
    worker_id: number;

    @ManyToOne(() => Client, client => client.appointment)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => Worker, worker => worker.appointment)
    @JoinColumn({ name: 'worker_id' })
    worker: Worker;
}
