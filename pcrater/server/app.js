// //credits: https://www.youtube.com/watch?v=71-CtIcmDJQ

// const { MongoClient } = require("mongodb");
// const bcrypt = require('bcrypt');
// require('dotenv').config();

// // Connection URI
// const uri = process.env.MONGO_URI;

// const { ApolloServer } = require('apollo-server-express');
// const { https } = require('https');
// const { http } = require('http');
// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const gql = require('graphql-tag');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');

// const User = require('./models/User');
// const Course = require('./models/Course');
// const Post = require('./models/Post');

// const client = new MongoClient(uri);

// const configurations = {
//   // Note: You may need sudo to run on port 443
//   production: { ssl: true, port: 443, hostname: 'pcrater.me' },
//   development: { ssl: false, port: 5000, hostname: 'localhost' },
// };

// const config = configurations['production'];

// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//   });
  
//   await server.start();
  
//   const app = express();
//   server.applyMiddleware({ app });
  
//   // Create the HTTPS or HTTP server, per configuration
//   let httpServer;
//   if (config.ssl) {
//     // Assumes certificates are in a .ssl folder off of the package root.
//     // Make sure these files are secured.
//     const options = {
//       key: fs.readFileSync('../../etc/letsencrypt/live/pcrater.me/privkey.pem'),
//       cert: fs.readFileSync('../../etc/letsencrypt/live/pcrater.me/fullchain.pem')
//     };
//     httpServer = https.createServer(
//       options,
//       app
//     );
//   } else {
//     httpServer = http.createServer(app);
//   }
  
//   await new Promise(resolve =>
//     httpServer.listen({ port: 5000 }, resolve)
//   );
//   console.log(`Server running at ${res.url}`);
  
//   mongoose.connect(uri, { useNewUrlParser: true})
//   .then (() => {
//       console.log("MongoDB Connected");
//   });
  
// }

// startServer();

//credits: https://www.youtube.com/watch?v=71-CtIcmDJQ

const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
require('dotenv').config();

// // Connection URI
const uri = process.env.MONGO_URI;

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