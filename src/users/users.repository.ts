import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = this.create();

    user.email = email;
    user.name = name;
    user.salt = await bcrypt.genSalt();//gera salt no momento da criação do usuario
    user.password = await this.hashPassword(password, user.salt);//gera uma hash com o password e o salto gerado

    try {
      await user.save();
      delete user.password;// deleta senha do banco 
      delete user.salt;// deleta salt do banco
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') { // erro do PostgreSQL retornado em caso de unique_violation
        throw new ConflictException('Este email já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário',
        );
      }
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    const { name, email } = updateUserDto;
    const user = await this.findOne(id, { select: ['email', 'name', 'id'] });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    user.email = email ? email : user.email;
    user.name = name ? name : user.name;

    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar usuário!');
    };
  }

  async deleteUser(id: number) {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado!');
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email });
    const checkPassword = await user.checkPassword(password);

    if (user && checkPassword) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}