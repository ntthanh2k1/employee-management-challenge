import "./config/database/firebase.config";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./modules/main.route";
import { app, server } from "./config/socketio/socketio.config";

dotenv.config();

const port = process.env.PORT;

app.use(express.json({ limit: "5mb" }));
app.use(
  cors({
    origin: process.env.UI_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", apiRouter);

server.listen(port, async () => {
  // await connectDB();
  console.log(`http://localhost:${port}`);
});
