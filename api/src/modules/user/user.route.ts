import express from "express";
import authorize from "../../middleware/auth.middleware";
import validateDto from "../../middleware/validate-dto.middleware";
import { CreateUserDto } from "./dto/create-user.dto";
import userController from "./user.controller";
import { UpdateUserDto } from "./dto/update-user.dto";
import { GetUsersDto } from "./dto/get-users.dto";

const router = express.Router();

router.use(authorize([0]));

router.post("/", validateDto(CreateUserDto), userController.createUser);
router.get("/", validateDto(GetUsersDto, "query"), userController.getUsers);
router.patch("/:id", validateDto(UpdateUserDto), userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
