import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { User } from 'src/users/user.entity';
import { AuthenticationService } from './authentication.service';
import { GetUser } from './get-user.decorator';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Post('/login')
  async login(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ token: string }> {
    return { token: await this.authenticationService.login(credentialsDto) };
  }

  @Get('/me')
  @UseGuards(AuthGuard())//restringe acesso a usuários autenticados
  getMe(@GetUser() user: User): User {
    return user;
  }
}
