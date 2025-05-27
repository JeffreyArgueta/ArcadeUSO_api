require("dotenv").config();
const winston = require("winston");

const LOG_FILE = process.env.LOG_FILE;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: LOG_FILE })
  ]
});

module.exports = logger;
