var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test'){
  var config = require('./config.json'); //this loads it as an object
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}