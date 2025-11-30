export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class AuthError extends HttpError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'AuthError';
  }
}