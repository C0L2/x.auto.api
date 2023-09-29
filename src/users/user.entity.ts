import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  first_name: string;

  @Column()
  second_name: string;

  @Column()
  father_name: string;

  @Column()
  email: string;

  @Column()
  birth_date: Date;

  @Column()
  role: string;

  @Column()
  @Exclude()
  password: string;
  /* 
  @OneToOne(() => Team, (team) => team.user)
  team: Team; */

  @AfterInsert()
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
  }
}
