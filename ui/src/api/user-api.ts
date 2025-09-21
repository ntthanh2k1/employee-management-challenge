import { CreateUserDto } from "../interfaces/user/create-user.interface";
import { GetUsersDto } from "../interfaces/user/get-users.interface";
import { UpdateUserDto } from "../interfaces/user/update-user.interface";
import axiosClient from "./axios-client";

const userApi = {
  createUser: (data: CreateUserDto) => axiosClient.post("/users", data),
  getUsers: (params: GetUsersDto) => axiosClient.get("/users", { params }),
  updateUser: (id: string, data: UpdateUserDto) =>
    axiosClient.patch(`/users/${id}`, data),
  deleteUser: (id: string) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
