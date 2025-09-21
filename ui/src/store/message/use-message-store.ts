import { create } from "zustand";
import messageApi from "../../api/message-api";
import { Contact } from "../../interfaces/message/contact.interface";
import { Message } from "../../interfaces/message/message.interface";
import { SendMessageDto } from "../../interfaces/message/send-message.interface";
import { useAuthStore } from "../auth/use-auth-store";

interface MessageState {
  contacts: Contact[];
  messages: Message[];
  loading: boolean;
  error: string | null;
  selectedUserId: string | null;
  getContacts: () => Promise<void>;
  getMessagesByUserId: (userId: string) => Promise<void>;
  sendMessage: (userId: string, data: SendMessageDto) => Promise<void>;
  clearMessages: () => void;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  contacts: [],
  messages: [],
  loading: false,
  error: null,
  selectedUserId: null,

  getContacts: async () => {
    try {
      set({ loading: true, error: null });

      const res = await messageApi.getContacts();

      set({ contacts: res.data.data });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch contacts.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    try {
      set({ loading: true, error: null });

      const res = await messageApi.getMessagesByUserId(userId);

      set({ selectedUserId: userId });
      set({ messages: res.data.data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch messages.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  sendMessage: async (userId, data) => {
    try {
      set({ loading: true, error: null });
      await messageApi.sendMessage(userId, data);
      await get().getMessagesByUserId(userId);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to send message.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  clearMessages: () => set({ messages: [] }),

  subscribeToMessages: () => {
    const { selectedUserId } = get();
    if (!selectedUserId) {
      return;
    }

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUserId;

      if (!isMessageSentFromSelectedUser) {
        return;
      }

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
