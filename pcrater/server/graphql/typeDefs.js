const gql = require('graphql-tag');

module.exports = gql`
  type Upvote {
    username: String!
  }
  type Comment {
    id: ID!
    author: String!,
    role: String!,
    content: String!,
    title: String!,
    createdAt: String!
    upvotes: Int!
    upvotes_list: [Upvote!]
  }
  type Post {
    id: ID!
    name: String!
    role: String!
    course: String!
    title: String!
    content: String!
    visibility: String!
    type: String!
    createdAt: String!
    upvotes: Int!
    upvotes_list: [Upvote!]
    comments: [Comment!]
  }
  type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String!
    institution: String!
    email: String!
    password: String!
    createdAt: String!
    token: String!
  }
  type Course {
    id: ID!
    courseName: String!
    courseCode: String!
    university: String!
    semester: String!
    roomID: String!
    createdAt: String!
    usersInRoom: [String!]
    teachingAssistants: [User!]
    professors: [User!]!
    students: [User!]
  }
  type Poll {
    id: ID!
    courseCode: String!
    title: String!
    description: String!
    createdAt: String!
    options: [String!]!
  }
  type Vote { 
    id: ID!
    option: String!
    username: String!
    poll: Poll!
  }
  type Query {
    getPosts(courseCode: String!): [Post]
    getPost(id: ID!): Post
    getUsers: [User]
    findUser(username: String!): User
    getCourses(university: String!): [Course]
    getCoursesOfStudent(username: String!): [Course]
    getCoursesOfProfessor(username: String!): [Course]
    getCoursesOfTA(username: String!): [Course]
    findCourse(courseCode: String!): Course
  }
  type Mutation {
      login(email: String!, password: String!): User! 
      register(username: String!, firstname: String!, lastname: String!, institution: String!, email: String! password: String!, confirmPassword: String!): User!
      updateUniversity(username: String!, university: String!): User!
      addCourse(courseName: String!, courseCode: String!, university: String!, semester: String!): Course!
      addProfessorToCourse(courseCode: String!, username: String!): Course!
      addStudentToCourse(courseCode: String!, username: String!): Course!
      addTaToCourse(courseCode: String!, username: String!): Course!
      addUserToRoomForCourse(username: String!, courseCode: String!): Course!
      deleteUserFromCourseRoom(username: String!, courseCode: String!): Course!
      deleteCourseForUser(courseCode: String!, username: String!): Course!
      addPost(name: String!, role: String!, course: String!, title: String!, content: String!, visibility: String!, type: String!): Post!
      updatePost(id: ID!, title: String!, content: String!, visibility: String!): Post!
      deletePost(id: ID!): Post!
      addComment(id: ID!, content: String!, author: String!, role: String!): Post!
      increaseUpvotesPost(id: ID!, username: String!): Post
      increaseUpvotesComment(postId: ID!, commentId: ID!, username: String!): Post
  }
`;