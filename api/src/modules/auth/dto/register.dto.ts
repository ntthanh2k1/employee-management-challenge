import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
