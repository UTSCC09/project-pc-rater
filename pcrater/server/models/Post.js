const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  name: String,
  role: String,
  course: String,
  title: String,
  content: String,
  visibility: String,
  createdAt: String
});

module.exports = model('Post', postSchema);