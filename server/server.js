var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://amirstep:7orion!@cluster0-shard-00-00-c8f1h.mongodb.net:27017,cluster0-shard-00-01-c8f1h.mongodb.net:27017,cluster0-shard-00-02-c8f1h.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true', {
  useMongoClient: true
});

// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true // will remove any leading or trailing white space
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });
//
// var newTodo = new Todo({
//   text: '  Eat this video '
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (e) => {
//   console.log('Unable to save todo', e);
// });

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  }
});

var newUser = new User({
  email: ' jakeyahoo.com '
});

newUser.save().then((doc) => {
  console.log('Saved user', doc)
}, (e) => {
  console.log('Unable to save user', e);
});
