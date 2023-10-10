import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Furnizori {
    @PrimaryGeneratedColumn()
    provider_id: number;

    @Column()
    provider_name: string;

    @Column()
    provider_adress: string;

    @Column()
    provider_email: string;

    @Column()
    provider_phone: string;
}