var mongoose = require ('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true // will remove any leading or trailing white space
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }/*,
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }*/
});

//module.exports = {Todo};

module.exports.Todo = Todo;
