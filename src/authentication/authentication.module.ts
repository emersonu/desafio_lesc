import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from '../users/users.repository'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'super-secret',
      signOptions: {
        expiresIn: 1800
      }
    })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
