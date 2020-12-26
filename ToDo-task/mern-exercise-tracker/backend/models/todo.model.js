const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  isdone: { type: Boolean, default:false },
  date: { type: Date },
  parentId:{type: String}
  
}, {
  timestamps: true,
});

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
