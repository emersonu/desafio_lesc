import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) { }

  @Post('/login')
  async login(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ token: string }> {
    return { token: await this.authenticationService.login(credentialsDto) };
  }
}
