import { Exclude } from 'class-transformer';
import { Team } from 'src/teams/team.entity';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToOne,
  OneToMany
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Team, (team) => team.user)
  team: Team;


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
