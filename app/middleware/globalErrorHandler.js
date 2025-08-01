const ApiError = require("../utils/apiError.js");

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const response = {
    status: err.status || "error",
    statusCode,
    data: err.data || null,
    message: err.message || "Internal Server Error",
  };

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  res.status(statusCode).json(response);
};

module.exports = globalErrorHandler;
