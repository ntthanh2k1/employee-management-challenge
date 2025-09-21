import { Request, Response } from "express";
import taskService from "./task.service";

// hàm tạo mới task
const createTask = async (req: Request, res: Response) => {
  try {
    const createTaskDto = req.body;
    const authUserId = req["user"].id;
    const result = await taskService.createTask(createTaskDto, authUserId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req: Request, res: Response) => {
  try {
    const getTasksDto = req.query;
    const authUser = req["user"];
    const result = await taskService.getTasks(getTasksDto, authUser);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateTaskDto = req.body;
    const authUserId = req["user"].id;
    const result = await taskService.updateTask(id, updateTaskDto, authUserId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const authUser = req["user"];
    const result = await taskService.deleteTask(id, authUser);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const taskController = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskController;
