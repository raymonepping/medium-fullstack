require('dotenv').config(); // Load environment variables

const logger = require('./configurations/logger'); // Correct path

console.log('Testing logging...');

// Test different log levels
logger.error('This is an error message');
logger.warn('This is a warning message');
logger.info('This is an info message');
logger.debug('This is a debug message');
