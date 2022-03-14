const gql = require('graphql-tag');

module.exports = gql`
  type Post {
    id: ID!
    name: String!
    role: String!
    course: String!
    title: String!
    content: String!
    visibility: String!
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
  type Query {
    getPosts: [Post]
    getUsers: [User]
    findUser: [User]
  }
  type Mutation {
    login(email: String!, password: String!): User! 
    register(username: String!, firstname: String!, lastname: String!, institution: String!, email: String! password: String!, confirmPassword: String!): User!
    addPost(name: String!, role: String!, course: String!, title: String!, content: String!, visibility: String!): Post!
    updatePost(id: ID!, title: String!, content: String!, visibility: String!): Post!
    deletePost(id: ID!): Post!
  }
`;