import { CustomError } from "./CustomError";

export class ResourceNotFoundError extends CustomError {
  errorCode: number = 404;

  errorType: string = "RESOURCE_NOT_FOUND";

  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
