import { CustomError } from "./CustomError";

export class AuthenticationError extends CustomError {
  errorCode: number = 401;

  errorType: string = "AUTHENTICATION_ERROR";

  message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
