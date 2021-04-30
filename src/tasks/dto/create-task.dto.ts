import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Título é obrigatório.' })
  @IsString({ message: 'Informe um título válido.' })
  @MaxLength(200, { message: 'O título não pode ter mais que 200 caracteres.' })
  title: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  @IsString({ message: 'Informe uma descrição válida.' })
  @MaxLength(200, { message: 'A descrição não pode ter mais que 200 caracteres.' })
  description: string;
}