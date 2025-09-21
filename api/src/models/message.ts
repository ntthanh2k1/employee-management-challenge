import { Collection } from "fireorm";

@Collection("messages")
export class Message {
  id: string;

  senderId: string;

  receiverId: string;

  content: string;

  createdAt?: Date;

  createdBy?: string;

  updatedAt?: Date;

  updatedBy?: string;
}
