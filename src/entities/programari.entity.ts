import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Programari {
    @PrimaryGeneratedColumn()
    programare_id: number;

    @Column()
    programare_name: string;

    @Column({ type: 'timestamp' })
    programare_date: Date;

    @Column({ nullable: true, default: null })
    description: string;

    @Column({ type: 'integer', nullable: true, default: null })
    client_id: number;

    @ManyToOne(() => Client, client => client.programari)
    @JoinColumn({ name: 'client_id' })
    client: Client;
}
