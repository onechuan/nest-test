import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';

@Module({
  controllers: [AttendeesController],
  providers: [AttendeesService]
})
export class AttendeesModule {}
