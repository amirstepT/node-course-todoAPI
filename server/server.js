require('./config/config');

// var env = process.env.NODE_ENV || 'development';
// var database;
//
// if (env === 'development') {
//   process.env.PORT = 3000;
//   database = 'TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   database = 'TodoAppTest';
// } else { // production heroku
//   database = 'TodoApp';
// }
// process.env.MONGODB_URI = `mongodb://amirstep:7orion!@cluster0-shard-00-00-c8f1h.mongodb.net:27017,cluster0-shard-00-01-c8f1h.mongodb.net:27017,cluster0-shard-00-02-c8f1h.mongodb.net:27017/${database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
// //console.log('uri', process.env.MONGODB_URI);

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (! ObjectID.isValid(id)) {
    res.status(404).send('ID not valid');
  } else {
    Todo.findById(id).then((todo) => {
      if (!todo) res.status(404).send('ID not found');
      else res.send({todo});
    }).catch((e) => res.status(400).send());
  }
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (! ObjectID.isValid(id)){
    res.status(404).send('ID not valid');
  } else {
    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) res.status(404).send('ID not found');
      else res.send({todo});
    }).catch((e) => res.status(400).send());
  }
});

app.patch('/todos/:id', (req, res) =>  {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (! ObjectID.isValid(id)){
    res.status(404).send('ID not valid');
  } else {

    if (_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(400).send('Could not find the todo by Id: ', id);
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
  }
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch ((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
