import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export type ValidationErrorObject = { [key: string]: string[] };

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
        error_type: "REQUEST_VALIDATION_ERROR",
        errors: errorObject,
      });
    } else {
      next();
    }
  };
}
