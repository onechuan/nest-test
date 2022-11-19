import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();
    if (createUserDto.password !== createUserDto.retryPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }
    const existingUser = await this.usersRepository.findOne({
      where: [
        {
          username: createUserDto.username,
        },
        {
          email: createUserDto.email,
        },
      ],
    });
    if (existingUser) {
      throw new BadRequestException(['username or email is already taken']);
    }
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.username = createUserDto.username;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    return {
      ...(await this.usersRepository.save(user)),
      token: this.authService.getTokenForUser(user),
    };
  }
}
