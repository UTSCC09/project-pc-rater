const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new Schema({
  name: String,
  role: String,
  course: String,
  title: String,
  content: String,
  visibility: String,
  type: String,
  createdAt: String,
  upvotes: Number,
  upvotes_list: [
    {
      username: String
    }
  ],
  comments: [
    {
      author: String,
      role: String,
      content: String,
      upvotes: Number,
      upvotes_list: [
        {
          username: String
        }
      ],
      createdAt: String
    }
  ]
});

module.exports = model('Post', postSchema);