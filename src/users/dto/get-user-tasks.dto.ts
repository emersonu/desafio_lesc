import { IsDate, IsNotEmpty } from "class-validator";

export class GetUserTasksDto {
  @IsNotEmpty({ message: 'Data inicial é obrigatório' })
  // @IsDate({ message: 'Escreva uma data válida' })
  start_date: string;

  @IsNotEmpty({ message: 'Data final é obrigatório' })
  // @IsDate({ message: 'Escreva uma data válida' })
  end_date: string;
}