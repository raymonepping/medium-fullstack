const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Import your Express app

describe('API Endpoints', () => {
  it('should respond with Hello, World! on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200); // Use Chai's expect
    expect(response.text).to.equal('Hello, World!');
  });

  // Add more tests as needed
});
