import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Programari {
    @PrimaryGeneratedColumn()
    programare_id: number;

    @Column()
    programare_name: string;

    @Column({ type: 'timestamp' })
    registr_date: Date;
}
