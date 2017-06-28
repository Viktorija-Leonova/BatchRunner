const express        = require('express');
const cors           = require('cors');
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./db/');
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

require('./app/routes')(app, db);
app.listen(port, () => {
  console.log('We are live on ' + port);
});
