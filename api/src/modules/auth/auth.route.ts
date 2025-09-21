import express from "express";
import validateDto from "../../middleware/validate-dto.middleware";
import { RegisterDto } from "./dto/register.dto";
import authController from "./auth.controller";
import { LoginDto } from "./dto/login.dto";
import authorize from "../../middleware/auth.middleware";
import { VerifyDto } from "./dto/verify.dto";

const router = express.Router();

router.post("/register", validateDto(RegisterDto), authController.register);
router.post("/login", validateDto(LoginDto), authController.login);
router.post("/verify", validateDto(VerifyDto), authController.verify);
router.post("/logout", authorize(), authController.logout);
router.get("/get-auth-user", authorize(), authController.getAuthUser);
router.patch("/update-profile", authorize(), authController.updateProfile);

export default router;
