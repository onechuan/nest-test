import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendees } from '../../attendees/entities/attendee.entity';

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

  @OneToMany(() => Attendees, (attendee) => attendee.event)
  attendees: Attendees[];
}
