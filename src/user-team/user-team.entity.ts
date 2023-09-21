import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

  @Column()
  id_team: number;
}