export class RobotError extends Error {
  code: number;
  message: string;

  constructor(code?: number, message?: string) {
    super();
    this.code = code || 500;
    this.message = message;
  }
}
