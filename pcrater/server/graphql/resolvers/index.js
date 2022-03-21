const usersResolvers = require('./users');
const courseResolvers = require('./courses');
const postsResolvers = require('./posts');

module.exports = {
    Query: {
      ...usersResolvers.Query,
      ...courseResolvers.Query,
      ...postsResolvers.Query
    },
    Mutation: {
      ...usersResolvers.Mutation,
      ...courseResolvers.Mutation,
      ...postsResolvers.Mutation
    }
  };