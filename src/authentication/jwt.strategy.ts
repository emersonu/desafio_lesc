import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret'
    });
  }
  async validate(payload: { id: number }) {

    const { id } = payload;
    const user = await this.userRepository.findOne(id, { select: ['name', 'email'] });

    if (!user) {
      throw new UnauthorizedException("Usuário não encontrado!")
    }

    return user;
  }
}