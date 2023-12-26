class UnAuthorizedError extends Error {
  public errorMessage: string;

  constructor(errorMessage: string, stack = '') {
    super(errorMessage);

    this.errorMessage = errorMessage;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default UnAuthorizedError;
