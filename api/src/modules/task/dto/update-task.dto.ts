import { IsOptional } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  assignedUserId?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  status?: boolean;
}
