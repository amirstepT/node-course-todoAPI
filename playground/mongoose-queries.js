const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5bc385ec8fa1c406c9050ed311';
//
// if(! ObjectID.isValid(id)){
//   console.log('ID not valid');
//   return;
// }

// Todo.find({
//   _id: id // with mongoose, do not need to convert string to actual new ObjectID
// }).then((todos) => {
//   console.log('Todos', todos)
// });
//
// Todo.findOne({
//   _id: id // with mongoose, do not need to convert string to actual new ObjectID
// }).then((todo) => {
//   console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) return console.log('ID not found');
//   console.log('Todo By ID: ', todo)
// }).catch((e) => console.log(e));

var userID = '5bc29e10112761058a338cd6';

User.findById(userID).then((user) => {
  if (!user) return console.log('User ID not found');
  console.log('User by ID: \n', user);
}).catch((e) => console.log(e));

// Todo.findById(id).then((todo) => {
//   if (!todo) return console.log('ID not found');
//   console.log('Todo By ID: ', todo)
// }).catch((e) => console.log(e));
