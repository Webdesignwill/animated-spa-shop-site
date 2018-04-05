
var path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

var config = {
  development : {
    port : 5050,
    root : rootPath
  },
  production : {
    ip : process.env.OPENSHIFT_NODEJS_IP,
    port : process.env.OPENSHIFT_NODEJS_PORT,
    root : rootPath
  }
};

module.exports = function () {
  var env = process.env.NODE_ENV || 'development';
  return config[env];
};
