import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { createQueryBuilder, getRepository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto, user);
  }

  async findTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id, { relations: ['user'] });

    // const task = await createQueryBuilder('task').where({ id: id }).select(['task.id', 'task.title', 'task.description', 'task.createdAt', 'user.id', 'user.name']).innerJoin('task.users', 'user').getMany();

    if (!task) throw new NotFoundException('Atividade não encontrada!');

    return task;
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: number): Promise<Task> {
    return await this.taskRepository.updateTask(updateTaskDto, id);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.deleteTask(id);
  }
}
