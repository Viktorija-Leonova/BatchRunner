module.exports = function(app, db) {
  const { execFile, exec, spawn } = require('child_process');

  app.get('/api/run/:name', (req, res) => {
    db.batches.findOne({ name: req.params.name })
      .then((doc) =>
        db.logs.insert({
          type : 'exec',
          name : doc.name,
          date : {
            start : new Date(),
            end : new Date()
          },
          name : req.params.name,
          log : 'test'
        })
      )
      .then((doc) => res.send(doc.log))
      .catch((err) => res.send(err));
  });

  app.post('/api/run', (req, res) => {
    db.batches.findOne(req.body)
      .then((doc) =>
        db.logs.insert({
          type : 'exec',
          name : doc.name,
          date : {
            start : new Date(),
            end : new Date()
          },
          name : req.body,
          log : 'test'
        })
      )
      .then((doc) => res.send(doc.log))
      .catch((err) => res.send(err));
  });

};
