import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { TaskRepository } from 'src/tasks/tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TaskRepository]), PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
