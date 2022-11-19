import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Events } from '../../events/entity/events.entity';

@Entity()
export class Attendees {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Events, (event) => event.attendees, {
    nullable: false,
  })
  @JoinColumn()
  event: Events;
}
