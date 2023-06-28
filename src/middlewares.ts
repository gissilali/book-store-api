import { NextFunction, Request, Response } from "express";

import ErrorResponse from "./interfaces/ErrorResponse";
import { ObjectSchema } from "joi";

export type ValidationErrorObject = { [key: string]: string[] };

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
}

export function validateRequest(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const { error } = schema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false,
    });
    if (error) {
      let errorObject: ValidationErrorObject = {};
      error.details.forEach((err: any) => {
        const key = err.context?.label;
        const errorsArray = errorObject[key] || [];
        errorsArray.push(err.message.replace(/['"]+/g, ""));
        errorObject[key] = errorsArray;
      });
      return res.status(422).json({
        errors: errorObject,
      });
    } else {
      next();
    }
  };
}
