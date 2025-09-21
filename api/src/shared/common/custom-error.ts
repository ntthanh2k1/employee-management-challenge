export class CustomError extends Error {
  statusCode: number;
  methodName?: string;

  constructor(message: string, statusCode = 500, methodName?: string) {
    super(message);
    this.statusCode = statusCode;
    this.methodName = methodName;
  }
}
