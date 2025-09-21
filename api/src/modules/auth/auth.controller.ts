import { Request, Response } from "express";
import authService from "./auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const registerDto = req.body;
    const result = await authService.register(registerDto);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const loginDto = req.body;
    const result = await authService.login(loginDto);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    const verifyDto = req.body;
    const result = await authService.verify(verifyDto);

    res.cookie("access_token", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.ACCESS_TOKEN_TTL) * 1000,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const result = await authService.logout();

    res.clearCookie("access_token");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAuthUser = async (req: Request, res: Response) => {
  try {
    const authUser = req["user"];
    const result = await authService.getAuthUser(authUser);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const updateProfileDto = req.body;
    const authUserId = req["user"].id;
    const result = await authService.updateProfile(
      updateProfileDto,
      authUserId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const authController = {
  register,
  login,
  verify,
  logout,
  getAuthUser,
  updateProfile,
};

export default authController;
