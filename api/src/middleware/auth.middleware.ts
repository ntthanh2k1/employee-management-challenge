import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "../modules/auth/token.service";
import { getRepository } from "fireorm";
import { User } from "../models/user";

const userRepository = getRepository(User);

// hàm middleware kiểm tra user đang login hay chưa để thao tác các tính năng
// nếu user có role phù hợp thì được thao tác, không thì báo lỗi
const authorize =
  (roles?: number[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let accessToken = null;

      const authHeader = req.headers["authorization"];

      if (authHeader && authHeader.startsWith("Bearer ")) {
        accessToken = authHeader.split(" ")[1];
      } else if (req.cookies && req.cookies["access_token"]) {
        accessToken = req.cookies["access_token"];
      }

      if (!accessToken) {
        return res.status(401).json({
          message: "Access token not provided.",
        });
      }

      const decoded = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const currentUser = await userRepository.findById(decoded.userId);

      if (!currentUser) {
        return res.status(401).json({
          message: "User not found.",
        });
      }

      if (roles && !roles.includes(currentUser.role)) {
        return res.status(403).json({
          message: "You do not have permission to access this feature.",
        });
      }

      req["user"] = {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
        role: currentUser.role,
      };

      next();
    } catch (error: any) {
      if (
        error instanceof TokenExpiredError ||
        error instanceof JsonWebTokenError
      ) {
        return res.status(401).json({
          message: "Access token invalid.",
        });
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  };

export default authorize;
