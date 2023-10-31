import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany, JoinColumn } from 'typeorm';
import { WorkerReport } from './worker-report.entity';
import { AssignedServices } from './assigned-services.entity';

@Entity()
@Index('IDX_SERVICE_ID', ['service_id'])
export class Services {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @OneToMany(() => AssignedServices, (service) => service.assignedService, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "service_id" })
  services: AssignedServices[]
} 
