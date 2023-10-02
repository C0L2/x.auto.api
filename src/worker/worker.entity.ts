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
  nume_lucrator: string;

  @Column()
  prenume_lucrator: string;

  @Column()
  email: string;

  @Column()
  numar_telefon: string;

  @Column()
  salary: number;

  @Column()
  role_id: number;

  @ManyToOne(() => Role, (workerRole) => workerRole.worker, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "role_id" })
  workerRoles: Role;

  @Exclude()
  @Column()
  password: string;

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
