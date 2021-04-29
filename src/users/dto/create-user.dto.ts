import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Endereço de email inválido' })
  @MaxLength(200, { message: 'O email não pode ter mais que 200 caracteres.' })
  email: string;

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Informe um nome de usuário válido' })
  @MaxLength(200, { message: 'O nome não pode ter mais que 200 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'A senha é obrigatória', })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres', })
  password: string;

  @IsNotEmpty({ message: 'A confirmação de senha é obrigatória' })
  @MinLength(6, { message: 'A confirmação de senha deve ter pelo menos 6 caracteres' })
  passwordConfirmation: string;
}