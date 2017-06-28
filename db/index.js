const Datastore      = require('nedb');
const functions      = require('./functions');

var db_batches = new Datastore({ filename: './db/batches.db', autoload: true });
var db_logs = new Datastore({ filename: './db/logs.db', autoload: true });

module.exports =  {
  batches : functions(db_batches),
  logs : functions(db_logs)
};
