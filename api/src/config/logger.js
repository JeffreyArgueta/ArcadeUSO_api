require("dotenv").config();
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const LOG_FOLDER = process.env.LOG_FOLDER;
const LOG_FILE_PATTERN = `${LOG_FOLDER}/%DATE%.log`;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: LOG_FILE_PATTERN,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",     // Máximo 20MB por archivo
      maxFiles: "14d",    // Mantiene los últimos 14 días de logs
      zippedArchive: true // Comprime archivos antiguos
    })
  ]
});

module.exports = logger;
