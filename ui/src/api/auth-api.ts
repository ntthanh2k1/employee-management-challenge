import { LoginDto } from "../interfaces/auth/login.interface";
import { RegisterDto } from "../interfaces/auth/register.interface";
import { UpdateProfileDto } from "../interfaces/auth/update-profile.interface";
import { VerifyDto } from "../interfaces/auth/verify.interface";
import axiosClient from "./axios-client";

const authApi = {
  register: (data: RegisterDto) => axiosClient.post("/auth/register", data),
  login: (data: LoginDto) => axiosClient.post("/auth/login", data),
  verify: (data: VerifyDto) => axiosClient.post("/auth/verify", data),
  logout: () => axiosClient.post("/auth/logout"),
  getAuthUser: () => axiosClient.get("/auth/get-auth-user"),
  updateProfile: (data: UpdateProfileDto) =>
    axiosClient.patch("/auth/update-profile", data),
};

export default authApi;
