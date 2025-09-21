import argon2 from "argon2";

const hashPassword = async (password: string) => {
  return await argon2.hash(password);
};

const verifyPassword = async (hashedPassword: string, password: string) => {
  return await argon2.verify(hashedPassword, password);
};

export { hashPassword, verifyPassword };
