import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Services {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  service_name: string;

  @Column()
  service_price: number;
}
