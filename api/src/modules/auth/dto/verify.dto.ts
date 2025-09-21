import { IsNotEmpty } from "class-validator";

export class VerifyDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  accessCode: string;
}
