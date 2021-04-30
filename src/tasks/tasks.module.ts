import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository, UserRepository]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule { }
