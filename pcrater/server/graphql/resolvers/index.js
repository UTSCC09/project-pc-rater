const usersResolvers = require('./users');
const courseResolvers = require('./courses');

module.exports = {
    Query: {
      ...usersResolvers.Query,
      ...courseResolvers.Query
    },
    Mutation: {
      ...usersResolvers.Mutation,
      ...courseResolvers.Mutation
    }
  };