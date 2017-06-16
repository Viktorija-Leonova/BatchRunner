const Datastore      = require('nedb');

var db_logs = new Datastore({ filename: './db/logs.db', autoload: true });
var db_batches = new Datastore({ filename: './db/batches.db', autoload: true });

module.exports =  {
  batches : db_batches,
  logs : db_logs
};
