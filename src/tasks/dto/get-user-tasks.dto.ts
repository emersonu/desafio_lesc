import { IsNotEmpty } from "class-validator";

export class GetUserTasksDto {
  @IsNotEmpty({ message: 'Data inicial é obrigatório' })
  start_date: string;

  @IsNotEmpty({ message: 'Data final é obrigatório' })
  end_date: string;
}