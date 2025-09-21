import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

// hàm middleware dùng để validate request data
const validateDto = (
  dto: any,
  source: "body" | "query" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];

      if (data === null || typeof data !== "object") {
        return res.status(400).json({
          message: "Request data format not valid.",
        });
      }

      const dtoInstance = plainToInstance(dto, data);
      const errors = await validate(dtoInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        return res.status(400).json({
          message: "Fail to validate request data.",
          errors: errors.map((e) => ({
            field: e.property,
            messages: Object.values(e.constraints || {}),
          })),
        });
      }

      Object.assign(req[source], dtoInstance);

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

export default validateDto;
