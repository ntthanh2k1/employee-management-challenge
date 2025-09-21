import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import { CreateTaskDto } from "./dto/create-task.dto";
import taskController from "./task.controller";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksDto } from "./dto/get-tasks.dto";

const router = express.Router();

router.use(authorize());

router.post("/", validateDto(CreateTaskDto), taskController.createTask);
router.get("/", validateDto(GetTasksDto, "query"), taskController.getTasks);
router.patch("/:id", validateDto(UpdateTaskDto), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
