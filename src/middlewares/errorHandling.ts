/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ErrorResponse from "../interfaces/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import ValidationError from "../exceptions/ValidationError";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  if (err instanceof PrismaClientKnownRequestError) {
    const validationError = new ValidationError(err);
    res.status(validationError.errorCode).json({
      error_type: validationError.errorType,
      errors: validationError.serializeErrors(),
    });
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    error_type: "SERVER_ERROR",
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "error" : err.stack,
  });
}
