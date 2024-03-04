class CustomError extends Error {
  public status: number;

  constructor(message: string, code: number) {
    super(message);
    this.status = code;
    this.message = message;

  }
}

export default CustomError;

