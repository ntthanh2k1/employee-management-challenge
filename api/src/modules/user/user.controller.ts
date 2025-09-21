import { Request, Response } from "express";
import userService from "./user.service";

// hàm tạo mới user
const createUser = async (req: Request, res: Response) => {
  try {
    const createUserDto = req.body;
    const authUserId = req["user"].id;
    const result = await userService.createUser(createUserDto, authUserId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsersDto = req.query;
    const result = await userService.getUsers(getUsersDto);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateUserDto = req.body;
    const authUserId = req["user"].id;
    const result = await userService.updateUser(id, updateUserDto, authUserId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const userController = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default userController;
