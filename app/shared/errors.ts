export class UnprocessableEntityError extends Error {
  readonly statusCode;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 422;
  }
}

export class UnauthorizedError extends Error {
  readonly statusCode;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 401;
  }
}
