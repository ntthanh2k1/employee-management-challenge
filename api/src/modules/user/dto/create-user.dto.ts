import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  email: string;
}
