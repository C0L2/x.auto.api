import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CarParts {
    @PrimaryGeneratedColumn()
    car_part_id: number;

    @Column()
    car_part_name: string;
}
