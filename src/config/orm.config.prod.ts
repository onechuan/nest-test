import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Events } from '../events/entity/events.entity';
import { Attendees } from '../attendees/entities/attendee.entity';
import { Profile } from '../auth/profile.entity';
import { User } from '../users/entities/user.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [Events, Attendees, Profile, User],
  }),
);
