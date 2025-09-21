import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  assignedUserId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: boolean;
}
