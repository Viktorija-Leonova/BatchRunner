const batchesRoutes   = require('./batches_routes');
const testRoutes      = require('./test_routes');
const logsRoutes      = require('./logs_routes');
const executionRoutes = require('./execution_routes');

module.exports = function(app, db) {
  batchesRoutes(app, db);
  logsRoutes(app, db);
  testRoutes(app, db);
  executionRoutes(app, db);
};
