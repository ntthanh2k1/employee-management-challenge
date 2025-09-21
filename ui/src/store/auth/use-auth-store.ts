import { create } from "zustand";
import authApi from "../../api/auth-api";
import { User } from "../../interfaces/user/user.interface";
import { RegisterDto } from "../../interfaces/auth/register.interface";
import { LoginDto } from "../../interfaces/auth/login.interface";
import { VerifyDto } from "../../interfaces/auth/verify.interface";
import { UpdateProfileDto } from "../../interfaces/auth/update-profile.interface";
import { io } from "socket.io-client";

const BASE_URL = (import.meta.env.API_URL || "http://localhost:3000").replace(
  /\/api\/?$/,
  ""
);

interface AuthState {
  authUser: User | null;
  isCheckingAuth: boolean;
  loading: boolean;
  error: string | null;
  socket: any;
  onlineUsers: string[];
  register: (data: RegisterDto) => Promise<void>;
  login: (data: LoginDto) => Promise<void>;
  verify: (data: VerifyDto) => Promise<void>;
  logout: () => Promise<void>;
  getAuthUser: () => Promise<void>;
  updateProfile: (data: UpdateProfileDto) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  loading: false,
  error: null,
  socket: null,
  onlineUsers: [],

  register: async (data) => {
    try {
      set({ loading: true, error: null });

      await authApi.register(data);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Register failed.",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await authApi.login(data);

      localStorage.setItem("login_email", res.data.data.email);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed.",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  verify: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await authApi.verify(data);

      set({ authUser: res.data.data });
      localStorage.removeItem("login_email");
      get().connectSocket();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Verify failed.",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });

      await authApi.logout();

      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed.",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getAuthUser: async () => {
    try {
      set({ loading: true, error: null });

      const res = await authApi.getAuthUser();

      set({ authUser: res.data.data });
      get().connectSocket();
    } catch (error) {
      set({
        authUser: null,
        error: error.response?.data?.message || "Get auth user failed.",
        loading: false,
      });
    } finally {
      set({ isCheckingAuth: false, loading: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ loading: true, error: null });

      await authApi.updateProfile(data);
      get().connectSocket();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Update profile failed.",
        loading: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) {
      return;
    }

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();

    set({ socket });

    // listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
