import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  // vì không dùng header authorization, dùng cookie trong request nên thêm dòng này
  withCredentials: true,
});

export default axiosClient;
