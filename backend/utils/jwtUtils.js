const jwt = require('jsonwebtoken');

// Load environment variables from .env file
dotenv.config();

// Log environment details
console.log('Loaded environment variables:');
console.log('ENV_FILE:', process.env.ENV_FILE); // Log the ENV_FILE value
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log JWT_SECRET for debugging purposes

// Generate a JWT token
const generateToken = (user) => {
  try {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Error generating token');
  }
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Error verifying token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
