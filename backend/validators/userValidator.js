const { body, validationResult } = require('express-validator');

// Define validation rules for user input
const userValidationRules = () => {
  return [
    body('name')
      .notEmpty().withMessage('Name is required.')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
    body('email')
      .isEmail().withMessage('Invalid email format.'),
    body('interests')
      .isArray().withMessage('Interests must be an array.')
  ];
};

// Middleware to validate user input
const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidationRules, validateUser };
