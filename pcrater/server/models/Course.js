const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');

const courseSchema = new Schema({
  courseName: String,
  courseCode: String,
  university: String,
  semester: String,
  createdAt: String,
  roomID: String,
  teachingAssistants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  professors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = model('Course', courseSchema);