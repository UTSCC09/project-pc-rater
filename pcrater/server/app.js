//credits: https://www.youtube.com/watch?v=71-CtIcmDJQ

const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');

// // Connection URI
const uri = "mongodb+srv://pcraters:appleorange123@cluster0.zvwmr.mongodb.net/pcraters";

const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const User = require('./models/User');
const Course = require('./models/Course');
const Post = require('./models/Post');

const client = new MongoClient(uri);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(uri, { useNewUrlParser: true})
.then (() => {
    console.log("MongoDB Connected");
    return server.listen({port:5000});
})
.then ((res) => {
    console.log(`Server running at ${res.url}`);
});