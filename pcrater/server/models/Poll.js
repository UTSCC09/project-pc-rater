const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const pollSchema = new Schema({
  courseCode: String,
  title: String,
  description: String,
  createdAt: String,
  options: [String],
});

module.exports = model('Poll', pollSchema);