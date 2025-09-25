import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import express from "express";
import socketioAuthMiddleware from "../../middleware/socketio-auth.middleware";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.UI_URL,
    credentials: true,
  },
});

io.use(socketioAuthMiddleware);

const getReceiverSocketId = (userId: string) => {
  return userSocketMap[userId];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.data.user.name);

  const userId = socket.data.userId;
  userSocketMap[userId] = socket.id;
  console.log("userSocketMap updated:", userSocketMap);

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.data.user.name);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { getReceiverSocketId, io, app, server };
