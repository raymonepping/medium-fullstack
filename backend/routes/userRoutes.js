// ./routes/userRoutes.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User related operations
 */

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpoint
 *     tags: [User]
 *     description: This endpoint is used to test if the user routes are working.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'User routes are working!'
 */
router.get('/test', (req, res) => {
  res.send('User routes are working!');
});

router.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

// Add more routes with Swagger annotations as needed
// Example: router.post('/create', createUser);

module.exports = router;
