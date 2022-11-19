import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

// DTO： Data To Object
export class UpdateEventDto extends PartialType(CreateEventDto) {}
