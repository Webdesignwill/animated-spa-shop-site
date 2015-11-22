
var express = require('express'),
      bodyParser = require('body-parser');

module.exports = function (app, config) {
  app.set('showStackError', true);

  app.use(express.static(config.root + '/public'));

  app.enable("jsonp callback");
  app.use(bodyParser());
};