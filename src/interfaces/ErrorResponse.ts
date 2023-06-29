export default interface ErrorResponse {
  error_type: string;
  errors?: any;
  message?: string;
  stack?: string;
}
