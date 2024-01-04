import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Programari {
    @PrimaryGeneratedColumn()
    programare_id: number;

    @Column()
    programare_name: string;

    @Column({ type: 'timestamp' })
    registr_date: Date;

    @Column({ type: 'integer', nullable: true, default: null })
    @ManyToOne(() => Client, client => client.programari)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}
