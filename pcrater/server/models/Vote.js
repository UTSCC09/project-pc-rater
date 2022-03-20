const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const VoteSchema = new Schema({
  option: String,
  username: String,
  poll: Poll,
});

module.exports = model('Vote', VoteSchema);