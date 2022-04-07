const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');

const postSchema = new Schema({
  username: String,
  role: String,
  course: String,
  title: String,
  content: String,
  visibility: String,
  type: String,
  createdAt: String,
  poll_options: [
    {
      users: [String],
      option: String,
      numVotes: Number
    }
  ],
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