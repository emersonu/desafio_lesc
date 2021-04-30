import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/authentication/get-user.decorator';
import { GetUserTasksDto } from './dto/get-user-tasks.dto';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReturnTaskDto } from './dto/return-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Post('/new')
  async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<ReturnTaskDto> {
    const task = await this.taskService.createTask(createTaskDto, user);
    return {
      task: task,
      message: "Atividade criada com sucesso!"
    };
  }

  @Get('/filter')
  async getUserTasks(@Query(ValidationPipe) getUserTasksDto: GetUserTasksDto, @GetUser() user: User) {
    return await this.taskService.getUserTasks(getUserTasksDto, user);
  }

  @Get(':id')
  async findTaskById(@Param('id') id: number, @GetUser() user: User): Promise<ReturnTaskDto> {
    const task = await this.taskService.findTaskById(id);

    if (user && user.id === task.user.id) {
      return { task: task, message: 'Atividade encontrada!' }
    } else {
      throw new UnauthorizedException('Você não tem permissão para acessar esta atividade!');
    }
  }

  @Put(':id')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: number, @GetUser() user: User): Promise<ReturnTaskDto> {
    const task = await this.taskService.findTaskById(id);

    if (user && (user.id === task.user.id)) {
      return {
        task: await this.taskService.updateTask(updateTaskDto, id),
        message: 'Atividade atualizada com sucesso!'
      };
    } else {
      throw new UnauthorizedException('Você não tem permissão para atualizar esta atividade!');
    }
  }

  @Delete(':id')
  async deleteTask(id: number, @GetUser() user: User): Promise<{ message: string }> {
    const task = await this.taskService.findTaskById(id);

    if (user && user.id === task.user.id) {
      await this.taskService.deleteTask(id);
      return { message: 'Atividade deletada com sucesso!' };
    } else {
      throw new UnauthorizedException('Você não tem permissão para acessar esta atividade!');
    }
  }
}