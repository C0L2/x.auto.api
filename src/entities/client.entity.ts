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
import { Programari } from './programari.entity';

@Entity()
@Unique(['email', 'numar_telefon'])
export class Client {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    nume_client: string;

    @Column()
    email: string;

    @Column()
    numar_telefon: string;

    @OneToMany(() => Masini, (car) => car.client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "client_id" })
    car: Masini[]

    @OneToMany(() => Programari, (programare) => programare.client, { onDelete: 'CASCADE' })
    programari: Programari[];
}
