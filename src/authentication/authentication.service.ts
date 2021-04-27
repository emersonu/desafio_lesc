import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from 'src/users/dto/credentials.dto';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async login(credentialsDto: CredentialsDto): Promise<string> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const jwtPayload = { id: user.id };
    const token = this.jwtService.sign(jwtPayload);

    return token;
  }
}
