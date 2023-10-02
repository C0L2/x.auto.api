import { Exclude } from 'class-transformer';
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
    prenume_client: string;

    @Column()
    email: string;

    @Column()
    numar_telefon: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    role_id: number;

    @ManyToOne(() => Role, (clientRole) => clientRole.client, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "role_id" })
    clientRoles: Role;

    @OneToMany(() => Programari, (programare) => programare.clientId)
    programare: Programari[]
}
