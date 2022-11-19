import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  ParseIntPipe,
  ValidationPipe,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreateEventDto } from './dto/create-event.dto';
import { Events } from './entity/events.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
  ) {}

  @Get()
  async getAllEvents() {
    this.logger.log(`this user start find all events`);
    const events = await this.eventsRepository.find();
    this.logger.debug(`this user had find ${events.length} events!!!`);
    return events;
  }

  @Post()
  @HttpCode(204)
  async createEvent(@Body(ValidationPipe) input: CreateEventDto) {
    return await this.eventsRepository.save({
      ...input,
      createAt: new Date(),
    });
  }

  @Get('/pratice')
  async findEventByAddress() {
    return await this.eventsRepository.find({
      where: [
        {
          address: Like('%BeiJing%'),
        },
      ],
    });
  }

  @Get(':id')
  async findOneEventById(@Param('id') id) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Patch(':id')
  async updateEventById(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.eventsRepository.findOneBy({ id });
    return await this.eventsRepository.save({
      ...event,
      ...input,
      createAt: new Date(),
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteEventById(@Param('id') id) {
    const event = await this.eventsRepository.findOneBy({ id });
    if (!event) return null;

    return await this.eventsRepository.remove(event);
  }
}
