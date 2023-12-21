import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, } from 'typeorm';
import { AssignedCarParts } from './assigned-car-parts.entity';

@Entity()
export class CarParts {
    @PrimaryGeneratedColumn()
    car_part_id: number;

    @Column()
    car_part_name: string;

    @OneToMany(() => AssignedCarParts, (carParts) => carParts.assignedCarParts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "car_part_id" })
    carParts: AssignedCarParts[]
}
