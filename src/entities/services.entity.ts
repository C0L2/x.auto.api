import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { WorkerReport } from './worker-report.entity';
import { AssignedServices } from './assigned-services.entity';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @OneToMany(() => AssignedServices, (service) => service.assignedService, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "service_id" })
  services: AssignedServices[]
} 
