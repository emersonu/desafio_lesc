import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Informe um título válido.' })
  @MaxLength(200, { message: 'O título não pode ter mais que 200 caracteres.' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Informe uma descrição válida.' })
  @MaxLength(200, { message: 'A descrição não pode ter mais que 200 caracteres.' })
  description: string;
}