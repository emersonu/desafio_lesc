import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/tasks.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserTasksDto } from './dto/get-user-tasks.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não são iguais!');
    } else {
      return await this.userRepository.createUser(createUserDto);
    }
  }

  async getUserTasks(getUserTasksDto: GetUserTasksDto, user: User): Promise<{ tasks: Task[] }> {
    return await this.userRepository.getUserTasks(getUserTasksDto, user);
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId, { select: ['email', 'name', 'id'] });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    return await this.userRepository.updateUser(updateUserDto, id);
  }

  async deleteUser(id: number) {
    await this.userRepository.deleteUser(id);
  }
}
