const { getKvCollection } = require('../config/pool');
const logger = require('../config/logger');

// Function to execute a Couchbase N1QL query
const executeQuery = async (query) => {
  try {
    const collection = getKvCollection();
    const result = await collection.cluster.query(query);
    logger.info('Query executed successfully', { rows: result.rows });
    return result.rows;
  } catch (err) {
    logger.error('Query execution failed', { error: err.message });
    throw err;
  }
};

// Handler to fetch products (example route)
const getProducts = async (req, res) => {
  try {
    const query = 'SELECT * FROM `demo`.`products` LIMIT 10'; // Example query
    const rows = await executeQuery(query);
    logger.info('Products fetched successfully', { rows });
    res.json(rows);
  } catch (err) {
    logger.error('Error fetching products', { error: err.message });
    res.status(500).send('Error fetching products');
  }
};

// Export the handlers
module.exports = {
  getProducts
};
