const winston = require('winston');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create logs directory path
const logsDirectory = path.join(__dirname, '../logs');

// Ensure the logs directory exists
const fs = require('fs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

// Default log level
const logLevel = process.env.LOG_LEVEL || 'info'; // Use 'info' as default if LOG_LEVEL is not set

const transports = [
  new winston.transports.File({ filename: path.join(logsDirectory, 'error.log'), level: 'error' }), // Only error logs
  new winston.transports.File({ filename: path.join(logsDirectory, 'combined.log') }), // All logs
];

// Add console transport if LOG_LEVEL is 'debug' or 'silly'
if (logLevel === 'debug' || logLevel === 'silly') {
  transports.push(new winston.transports.Console({
    format: winston.format.simple() // Simple format for console
  }));
}

const logger = winston.createLogger({
  level: logLevel, // Minimum log level for all transports
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: transports,
});

module.exports = logger;
