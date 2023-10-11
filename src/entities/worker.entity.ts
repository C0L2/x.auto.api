import { Exclude } from 'class-transformer';
import { Role } from 'src/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { WorkerReport } from './worker-report.entity';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  worker_id: number;

  @Column()
  worker_name: string;

  @Column()
  worker_surname: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  role_id: number;

  @ManyToOne(() => Role, (workerRole) => workerRole.worker, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "role_id" })
  workerRoles: Role;

  @OneToMany(() => WorkerReport, (worker_report) => worker_report.worker, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "worker_id" })
  worker_report: WorkerReport[];
}
