import express from "express";
import authRoutes from "./auth/auth.route";
import userRoutes from "./user/user.route";
import taskRoutes from "./task/task.route";
import messageRoutes from "./message/message.route";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/messages", messageRoutes);

export default router;
