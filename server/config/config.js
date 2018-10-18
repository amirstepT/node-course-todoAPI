var env = process.env.NODE_ENV || 'development';
var database;

if (env === 'development') {
  process.env.PORT = 3000;
  database = 'TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  database = 'TodoAppTest';
} else { // production heroku
  database = 'TodoApp';
}
process.env.MONGODB_URI = `mongodb://amirstep:7orion!@cluster0-shard-00-00-c8f1h.mongodb.net:27017,cluster0-shard-00-01-c8f1h.mongodb.net:27017,cluster0-shard-00-02-c8f1h.mongodb.net:27017/${database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
