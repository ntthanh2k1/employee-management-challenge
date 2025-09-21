import { IsOptional } from "class-validator";

export class GetUsersDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  role?: number;
}
