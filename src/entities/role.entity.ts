import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Worker } from 'src/entities/worker.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @OneToMany(() => Worker, (worker) => worker.workerRoles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "role_id" })
  worker: Worker[];
}
