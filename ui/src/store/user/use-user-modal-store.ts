import { create } from "zustand";

interface UserModalState {
  isOpen: boolean;
  mode: "create" | "edit";
  data: any | null;
  openModal: (mode: "create" | "edit", data?: any) => void;
  closeModal: () => void;
}

export const useUserModalStore = create<UserModalState>((set) => ({
  isOpen: false,
  mode: "create",
  data: null,
  openModal: (mode, data = null) => set({ isOpen: true, mode, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));
