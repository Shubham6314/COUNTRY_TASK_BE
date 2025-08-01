class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = "fail";
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
  }

  toJSON() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
    };
  }
}

module.exports = ApiError;
