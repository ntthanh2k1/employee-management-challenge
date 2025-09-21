import { Collection } from "fireorm";

@Collection("users")
export class User {
  id: string;

  name: string;

  username: string;

  password: string;

  phoneNumber: string;

  accessCode?: string = null;

  email: string;

  role: number;

  createdAt?: Date;

  createdBy?: string;

  updatedAt?: Date;

  updatedBy?: string;
}
