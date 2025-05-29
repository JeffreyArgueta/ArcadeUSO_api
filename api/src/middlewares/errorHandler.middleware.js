const logger = require("../config/logger");

const errorHandler = (res, error, message = "Error interno del servidor", statusCode = 500) => {
  const errorStatus = typeof error.status === "number" ? error.status : statusCode;
  const errorMessage = error.message || message;

  if (errorStatus >= 500) {
    logger.error(`❌ [${errorStatus}] ${message}:`, error);
  } else if (errorStatus >= 400) {
    logger.warn(`⚠️ [${errorStatus}] ${message}:`, errorMessage);
  } else {
    logger.info(`ℹ️ [${errorStatus}] ${message}`);
  }

  res.status(errorStatus).json({
    status: errorStatus,
    error: errorMessage,
    timestamp: new Date().toISOString(),
  });
};

module.exports = errorHandler;
