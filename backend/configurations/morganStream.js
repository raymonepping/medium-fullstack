// ./configurations/morganStream.js
const logger = require('./logger'); // Adjust path to your logger module

// Custom Morgan stream that uses Winston
const stream = {
  write: (message) => {
    logger.info(message.trim()); // Use Winston's info level for logging
  }
};

module.exports = stream;
