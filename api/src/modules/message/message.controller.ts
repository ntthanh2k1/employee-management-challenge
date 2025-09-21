import { Request, Response } from "express";
import messageService from "./message.service";

const getContacts = async (req: Request, res: Response) => {
  try {
    const authUser = req["user"];
    const result = await messageService.getContacts(authUser);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMessagesByUserId = async (req: Request, res: Response) => {
  try {
    const selectedUserId = req.params.userId;
    const authUserId = req["user"].id;
    const result = await messageService.getMessagesByUserId(
      selectedUserId,
      authUserId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendMessage = async (req: Request, res: Response) => {
  try {
    const receiverId = req.params.userId;
    const sendMessageDto = req.body;
    const authUserId = req["user"].id;
    const result = await messageService.sendMessage(
      receiverId,
      sendMessageDto,
      authUserId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const messageController = {
  getContacts,
  getMessagesByUserId,
  sendMessage,
};

export default messageController;
