// Core Node.js modules
const path = require('path');

// Third-party libraries
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet'); // Added helmet import

// Custom modules
const { connectToCouchbase } = require('./configurations/pool'); // Ensure this path is correct
const config = require('./configurations'); // Import from index.js in configurations
const morganStream = require('./configurations/morganStream'); // Import the custom Morgan stream

const app = express();
const port = config.loggerConfig.port; // Or other appropriate config value

// Logger setup
const logsDirectory = path.join(__dirname, 'logs');

// Create a new logger using the updated configuration
const logger = require('./configurations/logger'); // Import your logger module

// Middleware
app.use(express.json());
app.use(
  morgan('combined', { stream: morganStream }) // Use custom Morgan stream
);

// Example route in app.js or routes/userRoutes.js
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.use(helmet()); // Security enhancement
app.use(rateLimit(config.rateLimiterConfig)); // Apply rate limiting using rateLimiterConfig

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Ensure this matches your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Connect to Couchbase only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  connectToCouchbase(config.couchbaseConfig); // Pass couchbaseConfig if needed
}

// Load routes
const indexRouter = require('./routes/userRoutes'); // Ensure this is correct
app.use('/api', indexRouter); // Prefixed with '/api'

// Swagger setup
const swaggerOptions = config.swaggerOptions; // Use imported swagger options
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('Health check endpoint hit');
  res.status(200).json({ status: 'UP' });
});

// Centralized error handling
app.use((err, req, res, next) => {
  logger.error('Internal server error', { stack: err.stack });
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = app;
