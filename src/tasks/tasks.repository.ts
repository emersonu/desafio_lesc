import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./tasks.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const task = this.create();
    task.title = title;
    task.description = description;
    task.user = user;

    try {
      await task.save();
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao salvar atividade!');
    }
  }

  async updateTask(updateTaskDto: UpdateTaskDto, id: number): Promise<Task> {
    const task = await this.findOne(id);
    const { title, description } = updateTaskDto;

    if (!task) throw new NotFoundException('Atividade não encontrada!');

    task.title = title ? title : task.title;
    task.description = description ? description : task.description;

    try {
      await task.save();
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar atividade!');
    }
  }

  async deleteTask(id: number) {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Atividade não encontrada!');
    }
  }
}