import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EventsModule } from './events/events.module';
import { AttendeesModule } from './attendees/attendees.module';

import ormConfig from './config/ormConfig';
import ormConfigProd from './config/ormConfigProd';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'prod' ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    EventsModule,
    AttendeesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_NAME',
      useValue: 'NEST_TEST',
    },
  ],
})
export class AppModule {}
