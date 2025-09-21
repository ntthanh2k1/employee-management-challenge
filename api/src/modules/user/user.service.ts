import { getRepository } from "fireorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../../models/user";
import { CustomError } from "../../shared/common/custom-error";
import generator from "generate-password";
import { hashPassword } from "../../shared/utils/password";
import { sendEmail } from "../../config/email/email.config";
import { GetUsersDto } from "./dto/get-users.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

const userRepository = getRepository(User);

const createUser = async (createUserDto: CreateUserDto, authUserId: string) => {
  const { name, username, phoneNumber, email } = createUserDto;
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

  // tạo user mới
  const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  });
  const hashedPassword = await hashPassword(password);
  const newUser = await userRepository.create({
    name,
    username,
    phoneNumber,
    email,
    password: hashedPassword,
    role: 1,
    createdAt: new Date(),
    createdBy: authUserId,
  });

  // gửi email cho user
  await sendEmail(
    email,
    "Your Account Information",
    `
      Welcome ${name}!
      Your account has been created successfully.
      Username: ${username}
      Email: ${email}
      Password: ${password}
    `
  );

  return {
    message: "Create user successfully.",
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

const getUsers = async (getUsersDto: GetUsersDto) => {
  const { search, role } = getUsersDto;

  // lấy danh sách user sắp xếp theo ngày tạo mới nhất
  let users = await userRepository.orderByDescending("createdAt").find();

  // lọc user theo name, username, email nếu có nhập search
  let filterUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  }));

  if (search) {
    filterUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (role) {
    filterUsers = filterUsers.filter(
      (user) => Number(user.role) === Number(role)
    );
  }

  return {
    data: filterUsers,
  };
};

const updateUser = async (
  id: string,
  updateUserDto: UpdateUserDto,
  authUserId: string
) => {
  const { name, phoneNumber } = updateUserDto;
  const currentUser = await userRepository.findById(id);

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  // loop qua các field nếu có field nào undefined thì xóa đi
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
    message: "Update user successfully.",
    data: updatedUser,
  };
};

const deleteUser = async (id: string) => {
  const currentUser = await userRepository.findById(id);

  if (!currentUser) {
    throw new CustomError("User not found.", 404);
  }

  await userRepository.delete(id);

  return {
    message: "Delete user successfully.",
  };
};

const userService = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default userService;
