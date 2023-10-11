import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { WorkerReport } from './worker-report.entity';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @ManyToOne(() => WorkerReport, (report) => report.report_services, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "service_id" })
  services_report: WorkerReport;
}
