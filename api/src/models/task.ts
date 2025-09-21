import { Collection } from "fireorm";
import { assign } from "nodemailer/lib/shared";

@Collection("tasks")
export class Task {
  id: string;

  assignedUserId?: string;

  title: string;

  description: string;

  status?: boolean = false;

  createdAt?: Date;

  createdBy?: string;

  updatedAt?: Date;

  updatedBy?: string;
}
