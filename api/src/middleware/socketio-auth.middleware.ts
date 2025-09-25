import { NextFunction } from "express";
import { CustomError } from "../shared/common/custom-error";
import { verifyToken } from "../modules/auth/token.service";
import { getRepository } from "fireorm";
import { User } from "../models/user";

const userRepository = getRepository(User);

const socketioAuthMiddleware = async (socket: any, next: NextFunction) => {
  try {
    const accessToken = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row: string) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!accessToken) {
      return next(new CustomError("Token  not provided.", 401));
    }

    const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // find the user fromdb
    const currentUser = await userRepository.findById(decoded.userId);

    if (!currentUser) {
      return next(new CustomError("User not found.", 401));
    }

    socket.data.user = currentUser;
    socket.data.userId = currentUser.id.toString();

    console.log(
      `Socket authenticated for user: ${currentUser.name} (${currentUser.id})`
    );

    next();
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

export default socketioAuthMiddleware;
