import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique,
} from 'typeorm';
import { Masini } from './masini.entity';
import { Appointment } from './appointment.entity';

@Entity()
@Unique(['email', 'phone_number'])
export class Client {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    client_name: string;

    @Column()
    email: string;

    @Column()
    phone_number: string;

    @OneToMany(() => Masini, (car) => car.client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "client_id" })
    car: Masini[]

    @OneToMany(() => Appointment, (appointment) => appointment.worker, { onDelete: 'CASCADE' })
    appointment: Appointment[];
}
