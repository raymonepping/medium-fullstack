// ./configurations/couchbase.js

console.log('ENV_FILE:', process.env.ENV_FILE);

module.exports = {
    port: process.env.PORT || 3000,
    couchbase: {
      endpoint: process.env.COUCHBASE_ENDPOINT || 'couchbase',
      username: process.env.COUCHBASE_USERNAME,
      password: process.env.COUCHBASE_PASSWORD,
      bucket: process.env.COUCHBASE_BUCKET || 'demo',
      scope: process.env.COUCHBASE_SCOPE || '_default',
      collection: process.env.COUCHBASE_COLLECTION || '_default',
    },
    debug: process.env.DEBUG || false,
  };
  