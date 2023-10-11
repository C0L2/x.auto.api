import { Exclude } from 'class-transformer';
import { Role } from 'src/role/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

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

  /*  @AfterInsert()
   logInsert() {
     console.log('Inserted user with id of: ', this.id_user);
   }
 
   @AfterUpdate()
   logUpdate() {
     console.log('Updated user with id of: ', this.id_user);
   }
 
   @AfterRemove()
   logRemove() {
     console.log('Removed user with id of: ', this.id_user);
   } */
}
