import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { WorkerReport } from './worker-report.entity';
import { CarParts } from './car-parts.entity';

@Entity()
export class AssignedCarParts {
    @PrimaryGeneratedColumn()
    assigned_carpart_id: number;

    @Column()
    report_id: number;

    @Column()
    car_part_id: number;

    @Column({ nullable: true })
    price: number

    @Column()
    count: number

    @ManyToOne(() => CarParts, (assignedCarParts) => assignedCarParts.carParts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "car_part_id" })
    assignedCarParts: CarParts

    @ManyToOne(() => WorkerReport, (carPartsFromReport) => carPartsFromReport.carpart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "report_id" })
    carPartsFromReport: WorkerReport
}
