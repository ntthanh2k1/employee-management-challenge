import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  userInput: string;

  @IsNotEmpty()
  password: string;
}
