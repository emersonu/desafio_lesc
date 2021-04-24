import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUserDto);
    return {
      user: user,
      message: 'Usuário criado com sucesso!'
    }
  }
}
