var appRouter = function(app, currentDir) {


  app.get('/', function(req, res) {
    console.log(currentDir);
    res.sendFile(currentDir + '/index.html');
  });

  app.get('/account', function(req, res) {
    return res.send({
        'status': 'error',
        'message': 'I will not work with get-request',
      });
  });

  app.post('/account', function(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.send({
        'status': 'error',
        'message': 'missing a parameter',
      });
    } else {
      return res.send(req.body);
    }
  });
};

module.exports = appRouter;
