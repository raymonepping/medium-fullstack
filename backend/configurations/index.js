// Export configurations from various files
module.exports = {
    couchbaseConfig: require('./couchbase'),
    loggerConfig: require('./logger'),
    poolConfig: require('./pool'),
    rateLimiterConfig: require('./rateLimiter'),
    swaggerOptions: require('./swaggerOptions'),
  };
  