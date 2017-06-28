module.exports = function(app, db) {
  const { execFile, exec, spawn } = require('child_process');

  app.get('/ping', (req, res) => {
    exec('ping localhost', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.send({ 'error': `An error has occurred: ${error}` });
      } else {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.send(stdout);
      }
    });
  });

  app.get('/test', (req, res) => {
    res.send(test());
  });
};

function test() {
  return "test function";
}
