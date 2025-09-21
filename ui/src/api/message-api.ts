import { SendMessageDto } from "../interfaces/message/send-message.interface";
import axiosClient from "./axios-client";

const messageApi = {
  sendMessage: (id: string, data: SendMessageDto) =>
    axiosClient.post(`/messages/send-message/${id}`, data),
  getContacts: () => axiosClient.get("/messages/get-contacts"),
  getMessagesByUserId: (id: string) => axiosClient.get(`/messages/${id}`),
};

export default messageApi;
