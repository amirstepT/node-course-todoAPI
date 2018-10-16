const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) <== removes ALL of the documents from the collection -- returns nothing
// Todo.findOneAndRemove() -- returns the document
// Todo.findByIdAndRemove(id as string) -- returns the documents
