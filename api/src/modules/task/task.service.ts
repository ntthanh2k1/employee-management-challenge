import { getRepository } from "fireorm";
import { Task } from "../../models/task";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksDto } from "./dto/get-tasks.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { CustomError } from "../../shared/common/custom-error";

const taskRepository = getRepository(Task);

const createTask = async (createTaskDto: CreateTaskDto, authUserId: string) => {
  const { assignedUserId, title, description } = createTaskDto;

  // tạo task mới
  const newTask = await taskRepository.create({
    assignedUserId,
    title,
    description,
    createdAt: new Date(),
    createdBy: authUserId,
  });

  return {
    message: "Create task successfully.",
    data: newTask,
  };
};

const getTasks = async (getTasksDto: GetTasksDto, authUser: any) => {
  const { search } = getTasksDto;
  const { role } = authUser;
  let tasks = [];

  // lấy danh sách task sắp xếp theo ngày tạo mới nhất
  // và lọc theo role, admin thấy hết, employee chỉ thấy đã assign
  if (role === 0) {
    tasks = await taskRepository.orderByDescending("createdAt").find();
  } else {
    tasks = await taskRepository
      .whereEqualTo("assignedUserId", authUser.userId)
      .orderByDescending("createdAt")
      .find();
  }

  // lọc task theo title nếu có nhập search
  let filterTasks = tasks.map((task) => ({
    id: task.id,
    assignedUserId: task.assignedUserId,
    title: task.title,
    description: task.description,
    status: task.status,
  }));

  if (search) {
    filterTasks = tasks.filter((user) =>
      user.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return {
    data: filterTasks,
  };
};

const updateTask = async (
  id: string,
  updateTaskDto: UpdateTaskDto,
  authUserId: string
) => {
  const { assignedUserId, title, description, status } = updateTaskDto;
  const currentTask = await taskRepository.findById(id);

  if (!currentTask) {
    throw new CustomError("Task not found.", 404);
  }

  // loop qua các field nếu có field nào undefined thì xóa đi
  Object.keys(currentTask).forEach((key) => {
    if (currentTask[key] === undefined) {
      delete currentTask[key];
    }
  });

  currentTask.assignedUserId = assignedUserId;
  currentTask.title = title;
  currentTask.description = description;
  currentTask.status = status;
  currentTask.updatedAt = new Date();
  currentTask.updatedBy = authUserId;
  const updatedTask = await taskRepository.update(currentTask);

  return {
    message: "Update task successfully.",
    data: updatedTask,
  };
};

const deleteTask = async (id: string, authUser: any) => {
  const { role } = authUser;
  const currentTask = await taskRepository.findById(id);

  if (!currentTask) {
    throw new CustomError("User not found.", 404);
  }

  if (role !== 0 && currentTask.assignedUserId !== authUser.userId) {
    throw new CustomError("You can only delete your own task.", 403);
  }

  await taskRepository.delete(id);

  return {
    message: "Delete task successfully.",
  };
};

const taskService = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};

export default taskService;
