// configurations/swaggerOptions.js
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // Adjusted path to point to the routes directory
};

module.exports = options;
