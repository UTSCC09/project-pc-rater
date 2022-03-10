const gql = require('graphql-tag');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
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
  }
`;