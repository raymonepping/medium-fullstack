const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const helmet = require('helmet');
const logger = require('./configurations/logger'); // Import your logger module
const morgan = require('morgan');
const path = require('path');
const rateLimiterMiddleware = require('./configurations/rateLimiter');
const { connectToCouchbase } = require('./configurations/pool');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const couchbaseConfig = require('./configurations/couchbase'); // Import the Couchbase config
const morganStream = require('./configurations/morganStream'); // Import the custom Morgan stream

const app = express();
const port = process.env.PORT || 3000; // Default port for Express server

dotenv.config();

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for my application',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Adjust path to where your API docs are
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware setup
app.use(cors()); // Enable CORS
app.use(helmet()); // Enhance security
app.use(morgan('combined', { stream: morganStream })); // Use custom Morgan stream
app.use(express.json()); // JSON body parsing
app.use(rateLimiterMiddleware); // Apply rate limiting

// Define routes
app.use('/api', userRoutes); // API routes

// Define a route to handle GET requests at the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Initialize Couchbase connection pool with config
connectToCouchbase(couchbaseConfig.couchbase)
  .then(() => {
    // Start the Express server
    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    logger.error('Error during initialization:', err);
    process.exit(1);
  });
