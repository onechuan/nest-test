import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { Events } from './events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventsController],
})
export class EventsModule {}
