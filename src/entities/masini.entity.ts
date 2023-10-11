import { Client } from 'src/entities/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

    /* @ManyToOne(() => Client, (clientId) => clientId.client_id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "client_id" })
    clientId: Client */
}
