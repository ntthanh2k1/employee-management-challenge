import { IsOptional } from "class-validator";

export class GetTasksDto {
  @IsOptional()
  search?: string;
}
