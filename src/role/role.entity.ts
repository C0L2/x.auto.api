import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Worker } from 'src/worker/worker.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @OneToMany(() => Worker, (worker) => worker.workerRoles)
  worker: Worker[];
}
