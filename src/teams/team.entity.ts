import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id_team: number;

  @Column()
  team_name: string;

  @Column()
  team_points: number;

  @Column()
  id_user: number;

  @OneToOne(() => User, (user) => user.team)
  @JoinColumn({ name: "id_user"})
  user: User;
}