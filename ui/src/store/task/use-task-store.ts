import { create } from "zustand";
import { GetTasksDto } from "../../interfaces/task/get-tasks.interface";
import { CreateTaskDto } from "../../interfaces/task/create-task.interface";
import { UpdateTaskDto } from "../../interfaces/task/update-task.interface";
import taskApi from "../../api/task-api";

interface Task {
  id: string;
  assignedUserId: string;
  title: string;
  description: string;
  status: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  createTask: (taskData: CreateTaskDto) => Promise<void>;
  getTasks: (params?: GetTasksDto) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  createTask: async (taskData) => {
    set({ loading: true, error: null });
    try {
      await taskApi.createTask(taskData);
      await get().getTasks();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create task.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  getTasks: async (params) => {
    set({ loading: true, error: null });
    try {
      const res = await taskApi.getTasks(params);
      set({ tasks: res.data.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch tasks.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null });
    try {
      await taskApi.updateTask(id, taskData);
      await get().getTasks();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to update task.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await taskApi.deleteTask(id);
      await get().getTasks();
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to delete task.",
        loading: false,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
