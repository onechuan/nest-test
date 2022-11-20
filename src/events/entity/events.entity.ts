import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendees } from '../../attendees/entities/attendee.entity';
import { User } from '../../users/entities/user.entity';

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

  @OneToMany(() => Attendees, (attendee) => attendee.event, {
    cascade: true,
  })
  attendees: Attendees[];

  @ManyToOne(() => User, (user) => user.organized)
  @JoinColumn({ name: 'organizerId' })
  organizer: User;

  @Column()
  organizerId: number;

  attendeeCount?: number;
  attendeeRejected?: number;
  attendeeMaybe?: number;
  attendeeAccepted?: number;
}
