import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationErrorObject } from "../middlewares/requestValidation";
import { CustomError } from "./CustomError";

class ValidationError extends CustomError {
  error: PrismaClientKnownRequestError;

  errorCode: number = 422;

  errorType: string = "REQUEST_VALIDATION_ERROR";

  constructor(error: PrismaClientKnownRequestError, message: string = "") {
    super(message);
    this.error = error;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    if (this.error.code === "P2002") {
      let errorResponse: ValidationErrorObject = {};
      // Create an appropriate error response
      const fieldNames = this.error?.meta?.target as string[];

      fieldNames.forEach((fieldName) => {
        errorResponse[fieldName] = [`${fieldName} already exist`];
      });

      return errorResponse;
    }
  }
}

export default ValidationError;
