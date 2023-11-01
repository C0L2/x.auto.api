import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { Services } from './services.entity';
import { WorkerReport } from './worker-report.entity';

@Entity()
export class AssignedServices {
    @PrimaryGeneratedColumn()
    assigned_service_id: number;

    @Column()
    report_id: number;

    @Column()
    service_id: number;

    @ManyToOne(() => Services, (assignedService) => assignedService.services, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "service_id" })
    assignedService: Services

    @ManyToOne(() => WorkerReport, (servicesFromReport) => servicesFromReport.report, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "report_id" })
    servicesFromReport: WorkerReport
}
