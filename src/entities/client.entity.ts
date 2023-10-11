import { Exclude } from 'class-transformer';
import { Masini } from 'src/masini/masini.entity';
import { Programari } from 'src/programari/programari.entity';
import { Role } from 'src/role/role.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    client_id: number;

    @Column()
    nume_client: string;

    @Column()
    email: string;

    @Column()
    numar_telefon: string;
}
