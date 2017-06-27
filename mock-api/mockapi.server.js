var express = require('express'),
  cors = require('cors'),
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash');

var port = process.env.MOCKAPI_PORT || 8888;
var host = process.env.MOCKAPI_HOST || '0.0.0.0';

var app = express();
app.use(cors());

app.set('port', port);
app.set('host', host);

var endpoints = path.resolve(__dirname, 'endpoints');
fs.readdir(endpoints, function (err, files) {
  var server = {
    app: app,
    init: function (svc) {
      console.info('mock ' + svc + ' up');
    },
    logRequest: function (svc, req) {
      console.info('[' + svc + '] requested');
      console.info('params: ' + JSON.stringify(req.params));
      console.info('query: ' + JSON.stringify(req.query));
      console.info('~~~~\n');
    }
  };
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (_.endsWith(file, '.endpoint.js')) {
      require(path.resolve(endpoints, file))(server);
    }
  }
});

app.listen(app.get('port'), app.get('host'), function () {
  console.info('Mock-API server started on http://' + app.get('host') + ':' + app.get('port'));
});
