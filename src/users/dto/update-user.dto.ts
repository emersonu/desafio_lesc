import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Endereço de email inválido' })
  @MaxLength(200, { message: 'O email não pode ter mais que 200 caracteres.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Informe um nome de usuário válido' })
  @MaxLength(200, { message: 'O nome não pode ter mais que 200 caracteres.' })
  name: string;
}