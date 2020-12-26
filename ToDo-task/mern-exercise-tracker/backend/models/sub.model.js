const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subTodoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  parentName: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const SubTodo = mongoose.model('subtodo', subTodoSchema);

module.exports = SubTodo;