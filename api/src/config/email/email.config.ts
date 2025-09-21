import nodemailer from "nodemailer";
import { CustomError } from "../../shared/common/custom-error";

const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  if (!to) {
    throw new CustomError("Receiver email is required.", 400);
  }

  await transporter.sendMail({
    from: `${process.env.MAIL_USER}`,
    to,
    subject,
    text,
  });
};

export { sendEmail };
