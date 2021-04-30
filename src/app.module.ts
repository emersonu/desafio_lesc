import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { TasksModule } from './tasks/tasks.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthenticationModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
