module.exports = function(app, db) {

  app.post('/api/batches/find', (req, res) => {
    db.batches.find(req.body)
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

  app.get('/api/batches/:name', (req, res) => {
    db.batches.findOne({ name: req.params.name })
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

  app.put('/api/batches', (req, res) => {
    if (!validate(req.body)) res.send({'error': 'batch is invalid'})
    db.batches.insert(req.body)
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

};

function validate(batch) {
  return batch.name != null && batch.script != null;
}
