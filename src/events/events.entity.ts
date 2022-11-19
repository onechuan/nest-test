import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  name: string;

  @Column('text')
  description: string;

  @Column()
  createAt: Date;

  @Column()
  address: string;
}
