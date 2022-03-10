const { model, Schema } = require('mongoose');

const courseSchema = new Schema({
  courseName: String,
  courseCode: String,
  semester: String,
  createdAt: String,
  teachingAssistants: [
    {
      id: String,
      firstname: String,
      lastname: String,
      username: String
    }
  ],
  professors: [
    {
      id: String,
      firstname: String,
      lastname: String,
      username: String
    }
  ],
  students: [
    {
        id: String,
        firstname: String,
        lastname: String,
        username: String
      }
  ]
});

module.exports = model('Course', courseSchema);