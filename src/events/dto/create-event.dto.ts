import { Length } from 'class-validator';

// DTO： Data To Object
export class CreateEventDto {
  @Length(2, 18)
  name: string;
  description: string;
  address: string;
}
