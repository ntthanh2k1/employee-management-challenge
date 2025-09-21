import { getRepository } from "fireorm";
import { RegisterDto } from "./dto/register.dto";
import { User } from "../../models/user";
import { CustomError } from "../../shared/common/custom-error";
import { hashPassword, verifyPassword } from "../../shared/utils/password";
import { LoginDto } from "./dto/login.dto";
import { createAccessToken } from "./token.service";
import { VerifyDto } from "./dto/verify.dto";
import { sendEmail } from "../../config/email/email.config";
import { createSixDigitsCode } from "../../shared/utils/create-code";
import { UpdateProfileDto } from "./dto/update-profile.dto";

const userRepository = getRepository(User);

// hàm đăng ký user mới
const register = async (registerDto: RegisterDto) => {
  const { name, username, phoneNumber, email, password, confirmPassword } =
    registerDto;
  const existingUsername = await userRepository
    .whereEqualTo("username", username)
    .find();

  // kiểm tra username đã tồn tại hay chưa
  if (existingUsername.length > 0) {
    throw new CustomError(`User ${username} already exists.`, 400);
  }

  const existingEmail = await userRepository
    .whereEqualTo("email", email)
    .find();

  // kiểm tra email đã tồn tại hay chưa
  if (existingEmail.length > 0) {
    throw new CustomError(`Email ${email} already exists.`, 400);
  }

  // kiểm tra password và confirm password có khớp nhau hay không
  if (password !== confirmPassword) {
    throw new CustomError("Password and confirm password not match.", 400);
  }

  // tạo user mới
  const hashedPassword = await hashPassword(password);
  const newUser = await userRepository.create({
    name,
    username,
    phoneNumber,
    email,
    password: hashedPassword,
    role: 0,
    createdAt: new Date(),
  });

  return {
    message: "Register user successfully.",
    data: {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      phoneNumber: newUser.phoneNumber,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

// hàm đăng nhập
const login = async (loginDto: LoginDto) => {
  const { userInput, password } = loginDto;
  let currentUser = await userRepository
    .whereEqualTo("username", userInput)
    .find();

  // kiểm tra
  if (currentUser.length === 0) {
    currentUser = await userRepository.whereEqualTo("email", userInput).find();
  }

  if (currentUser.length === 0) {
    throw new CustomError("User not found.", 404);
  }

  const isPasswordValid = await verifyPassword(
    currentUser[0].password,
    password
  );

  if (!isPasswordValid) {
    throw new CustomError("Password invalid.", 400);
  }

  // tạo accessCode 6 số random và gửi qua email
  const accessCode = createSixDigitsCode();

  // update accessCode trong db
  Object.keys(currentUser[0]).forEach((key) => {
    if (currentUser[0][key] === undefined) {
      delete currentUser[0][key];
    }
  });

  currentUser[0].accessCode = accessCode;
  await userRepository.update(currentUser[0]);

  // gửi accessCode qua email
  await sendEmail(
    currentUser[0].email,
    "Access code",
    `Access code: ${accessCode}`
  );

  return {
    message: "Login successfully.",
    data: {
      id: currentUser[0].id,
      name: currentUser[0].name,
      username: currentUser[0].username,
      email: currentUser[0].email,
    },
  };
};

// hàm xác minh code gửi trong email
const verify = async (VerifyDto: VerifyDto) => {
  const { email, accessCode } = VerifyDto;
  const currentUser = await userRepository.whereEqualTo("email", email).find();

  if (currentUser.length === 0) {
    throw new CustomError("User not found.", 404);
  }

  if (currentUser[0].accessCode !== accessCode) {
    throw new CustomError("Access code invalid.", 400);
  }

  // update xóa accessCode trong db
  Object.keys(currentUser[0]).forEach((key) => {
    if (currentUser[0][key] === undefined) {
      delete currentUser[0][key];
    }
  });

  currentUser[0].accessCode = null;
  await userRepository.update(currentUser[0]);

  const tokenPayload = {
    userId: currentUser[0].id,
    username: currentUser[0].username,
  };
  const accessToken = await createAccessToken(tokenPayload);

  return {
    message: "Verify successfully.",
    accessToken: accessToken,
    data: {
      id: currentUser[0].id,
      name: currentUser[0].name,
      username: currentUser[0].username,
      email: currentUser[0].email,
      role: currentUser[0].role,
    },
  };
};

// hàm đăng xuất
const logout = async () => {
  return {
    message: "Logout successfully.",
  };
};

// hàm lấy thông tin user đăng nhập
const getAuthUser = async (authUser: any) => {
  return {
    data: {
      id: authUser.id,
      name: authUser.name,
      username: authUser.username,
      phoneNumber: authUser.phoneNumber,
      email: authUser.email,
      role: authUser.role,
    },
  };
};

// Hàm cập nhật thông tin user login
const updateProfile = async (
  updateProfileDto: UpdateProfileDto,
  authUserId: string
) => {
  const { name, phoneNumber } = updateProfileDto;
  const currentUser = await userRepository.findById(authUserId);

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  Object.keys(currentUser).forEach((key) => {
    if (currentUser[key] === undefined) {
      delete currentUser[key];
    }
  });

  currentUser.name = name;
  currentUser.phoneNumber = phoneNumber;
  currentUser.updatedAt = new Date();
  currentUser.updatedBy = authUserId;
  const updatedUser = await userRepository.update(currentUser);

  return {
    message: "Update profile successfully.",
    data: updatedUser,
  };
};

const authService = {
  register,
  login,
  verify,
  logout,
  getAuthUser,
  updateProfile,
};

export default authService;
