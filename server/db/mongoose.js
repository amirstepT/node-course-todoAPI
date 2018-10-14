var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://amirstep:7orion!@cluster0-shard-00-00-c8f1h.mongodb.net:27017,cluster0-shard-00-01-c8f1h.mongodb.net:27017,cluster0-shard-00-02-c8f1h.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
  useMongoClient: true
});

module.export = {mongoose};
