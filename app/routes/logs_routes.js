module.exports = function(app, db) {

  app.post('/api/logs/find', (req, res) => {
    db.logs.find(req.body)
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

  app.get('/api/logs/:id', (req, res) => {
    db.logs.find({ log_id : req.params.id })
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

  app.put('/api/logs', (req, res) => {
    db.logs.insert(req.body)
      .then((doc) => res.send(doc))
      .catch((err) => res.send(err));
  });

};
