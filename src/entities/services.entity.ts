import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
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
