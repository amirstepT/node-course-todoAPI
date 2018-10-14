var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
    console.log(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

// var newTodo = new Todo({
//   text: '  Eat this bicycle '
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (e) => {
//   console.log('Unable to save todo', e);
// });
//
//
//
// var newUser = new User({
//   email: ' john@facebook.com '
// });
//
// newUser.save().then((doc) => {
//   console.log('Saved user', doc)
// }, (e) => {
//   console.log('Unable to save user', e);
// });