import { getRepository } from "fireorm";
import { User } from "../../models/user";
import { Message } from "../../models/message";
import { SendMessageDto } from "./dto/send-message.dto";
import { getReceiverSocketId, io } from "../../config/socketio/socketio.config";

const userRepository = getRepository(User);
const messageRepository = getRepository(Message);

// hàm lấy danh sách user trong module tin nhắn
const getContacts = async (authUser: any) => {
  const { userId, role } = authUser;
  let contacts = [];

  // nếu là role admin thì thấy tất cả nhân viên và tất cả admin khác
  // nếu là role employee thì chỉ thấy tất cả admin, không thấy các employee khác
  if (role === 0) {
    contacts = await userRepository.find();
  } else {
    contacts = await userRepository.whereEqualTo("role", 0).find();
  }

  // lọc bỏ user đang login
  contacts = contacts
    .filter((contact) => contact.id !== userId)
    .map((contact) => ({
      id: contact.id,
      name: contact.name,
      username: contact.username,
    }));

  return {
    data: contacts,
  };
};

// hàm lấy lịch sử chat giữa user login và user chỉ định
const getMessagesByUserId = async (
  selectedUserId: string,
  authUserId: string
) => {
  // lấy danh sách tin nhắn user login gửi cho user chỉ định
  const sentMessages = await messageRepository
    .whereEqualTo("senderId", authUserId)
    .whereEqualTo("receiverId", selectedUserId)
    .find();

  // lấy danh sách tin nhắn user chỉ định gửi cho user login
  const receivedMessages = await messageRepository
    .whereEqualTo("senderId", selectedUserId)
    .whereEqualTo("receiverId", authUserId)
    .find();

  // gộp 2 danh sách tin nhắn và sắp xếp theo thời gian gửi
  const messages = [...sentMessages, ...receivedMessages].sort(
    (sent, received) => {
      return sent.createdAt.getTime() - received.createdAt.getTime();
    }
  );

  return {
    data: messages,
  };
};

const sendMessage = async (
  receiverId: string,
  sendMessageDto: SendMessageDto,
  authUserId: string
) => {
  const { content } = sendMessageDto;

  // tạo tin nhắn mới
  const newMessage = await messageRepository.create({
    senderId: authUserId,
    receiverId: receiverId,
    content: content,
    createdAt: new Date(),
    createdBy: authUserId,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  return {
    message: "Send message successfully.",
    data: newMessage,
  };
};

const messageService = {
  getContacts,
  getMessagesByUserId,
  sendMessage,
};

export default messageService;
