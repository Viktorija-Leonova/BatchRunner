module.exports = function(app, db) {
  const { execFile, exec, spawn } = require('child_process');

  app.post('/run', (req, res) => {
    db.batches.findOne({ name: req.body.name }, function (err, doc) {
      if (err || doc == null) {
        res.send({ 'error': `Can't find batch by name [${req.body.name}]` });
      } else {
        console.log(doc);
        db.logs.insert({
          type : 'exec',
          date : {
            start : new Date(),
            ended : new Date()
          },
          name : req.body.name,
          log : 'test'
        }, function (err, doc) {
          res.send(doc.log)
        });
      }
    });
  });

  app.post('/find', (req, res) => {
    db.batches.find(req.body, function (err, docs) {
      if (err) {
        res.send({ 'error': `An error has occurred: ${err}` });
      } else {
        res.send(docs);
      }
    });
  });

  app.put('/batch', (req, res) => {
    console.log(`req: ${JSON.stringify(req.body)}`);
    db.batches.insert(req.body, function (err, newDoc) {
      if (err) {
        res.send({ 'error': `An error has occurred: ${err}` });
      } else {
        res.send(newDoc);
      }
    });
  });

  app.get('/batch/:name', (req, res) => {
    db.batches.findOne({ name: req.params.name }, function (err, doc) {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(doc);
      }
    });
  });

};
