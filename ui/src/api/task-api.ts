import { CreateTaskDto } from "../interfaces/task/create-task.interface";
import { GetTasksDto } from "../interfaces/task/get-tasks.interface";
import { UpdateTaskDto } from "../interfaces/task/update-task.interface";
import axiosClient from "./axios-client";

const taskApi = {
  createTask: (data: CreateTaskDto) => axiosClient.post("/tasks", data),
  getTasks: (params: GetTasksDto) => axiosClient.get("/tasks", { params }),
  updateTask: (id: string, data: UpdateTaskDto) =>
    axiosClient.patch(`/tasks/${id}`, data),
  deleteTask: (id: string) => axiosClient.delete(`/tasks/${id}`),
};

export default taskApi;
