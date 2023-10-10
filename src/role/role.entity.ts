import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { Worker } from 'src/worker/worker.entity';
import { Client } from 'src/client/client.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  role_name: string;

  @OneToMany(() => Worker, (worker) => worker.workerRoles, { onDelete: 'CASCADE' })
  worker: Worker[];

  @OneToMany(() => Client, (client) => client.clientRoles, { onDelete: 'CASCADE' })
  client: Client[];
}
