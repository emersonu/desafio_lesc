import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/authentication/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Post('/new')
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.userService.createUser(createUserDto);
    return {
      user: user,
      message: 'Usuário criado com sucesso!'
    }
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<ReturnUserDto> {
    const user = await this.userService.findUserById(id);
    return {
      user: user,
      message: 'Usuário encontrado!'
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param('id') id: number, @GetUser() user: User): Promise<ReturnUserDto> {
    if (user.id == id) {
      return {
        user: await this.userService.updateUser(updateUserDto, id),
        message: 'Usuário atualizado com sucesso!'
      }
    } else {
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário!')
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteUser(@Param('id') id: number, @GetUser() user: User): Promise<{ message: string }> {
    if (user.id == id) {
      await this.userService.deleteUser(id);
      return { message: 'Usuário deletado com sucesso' }
    } else {
      throw new ForbiddenException('Você não tem permissão para atualizar este usuário!')
    }
  }
}
