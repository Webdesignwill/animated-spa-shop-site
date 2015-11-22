
var express = require('express'),
      debug = require('debug')('vollebak');

var config = require('./config/config')(),
      http = require('http');

var app = express(),
      server = http.createServer(app);

// settings
require('./config/express')(app, config);

server.listen(config.port, config.ip, function () {
  var ip = config.ip || 'Not set (localhost)'
  console.log('IP : ' + ip + ' PORT ' + config.port);
});

// expose app
exports = module.exports = app;
