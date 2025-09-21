import { IsOptional } from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  phoneNumber?: string;
}
