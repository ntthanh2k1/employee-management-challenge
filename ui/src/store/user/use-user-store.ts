import { create } from "zustand";
import { CreateUserDto } from "../../interfaces/user/create-user.interface";
import { GetUsersDto } from "../../interfaces/user/get-users.interface";
import { UpdateUserDto } from "../../interfaces/user/update-user.interface";
import userApi from "../../api/user-api";
import { User } from "../../interfaces/user/user.interface";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;

  createUser: (userData: CreateUserDto) => Promise<void>;
  getUsers: (params?: GetUsersDto) => Promise<void>;
  updateUser: (id: string, userData: UpdateUserDto) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  createUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      await userApi.createUser(userData);
      await get().getUsers();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create user.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  getUsers: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await userApi.getUsers(params);
      set({ users: res.data.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      await userApi.updateUser(id, userData);
      await get().getUsers();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update user.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      await userApi.deleteUser(id);
      await get().getUsers();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete user.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
