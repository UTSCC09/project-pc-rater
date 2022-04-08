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
// Credits: 
// GraphQL Server (MERNG): #1 Setting Up Database & Server https://www.youtube.com/watch?v=71-CtIcmDJQ
// React Group Video Chat | simple-peer webRTC: https://www.youtube.com/watch?v=R1sfHPwEH7A&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=3
// Handle User Disconnect in WebRTC Group Video Chat https://www.youtube.com/watch?v=0fWN_q4zAqs&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=10
// WebRTC Screen Sharing Tutorial: https://www.youtube.com/watch?v=X8QHHB7DA90&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=4
// How To Mute Mic or Toggle Cam In WebRTC Video Chat? : https://www.youtube.com/watch?v=Uk5DbEnFNP0&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=14
// React Chat App Using Socket.IO | Socket IO Tutorial: https://www.youtube.com/watch?v=E4V6nbP_NoQ
// Develop Collaborative White Board : Web socket, Node JS & React JS : https://www.youtube.com/watch?v=LZTWYdU4nKk
// Develop Collaborative White Board : Web socket, Node JS & React JS | Part 2 : https://www.youtube.com/watch?v=bQy6WpIXW18


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
const cors = require('cors');

let token;

const server = new ApolloServer({
  playground: false,
  typeDefs,
  resolvers,
  context: ({ req }) => {
    token = req.headers.authorization;
    return { "token": req.headers.authorization };
  },
});

const express = require("express");
const app = express();
app.use(cors());


const fs = require("fs");
const http = require("http");
const https = require("https");

httpServer = http.createServer(app);
const socket = require("socket.io");

let socketIdAndUserName = [];

let drawingBoardData;


const io = socket(httpServer, {
   path: "/videocall"
});

// const io = socket(httpServer, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

httpServer.listen(9000, () => console.log('http server for the sockets is running on port 9000'));

//httpServer.listen(8000, () => console.log('http server for the sockets is running on port 8000'));

io.on('connection', socket => {
  const id = socket.id;

  socket.on("check if user is in room", (data) => {
    if(token){
      const { username, roomID } = data;
      if(!socketIdAndUserName.map(elmt => elmt[1]).includes(username)){
        socketIdAndUserName.push([id, username, roomID]);
        io.to(id).emit("user is not in room yet");
      }else{
        io.to(id).emit("user is already in room");
      }
    }else{
      console.error("User is anauthorized.");
    }
  });


  socket.on("joining", (roomID) => {
    if(token){
      socket.emit("init", socketIdAndUserName.filter(elmt => elmt[2] === roomID).filter(elmt => elmt[0] !== id).map(elmt => [elmt[0], elmt[1]]));
      io.to(id).emit("socket id", id);
    }else{
      console.error("User is anauthorized.");
    }
  });


  socket.on("sending", (data) => {
    if(token){
      const { userID, username, sig, userOnCallID } = data;
      const welcomeSignal = { sig, userOnCallID, username };
      io.to(userID).emit('joined room', welcomeSignal);
    }else{
      console.error("User is anauthorized.");
    }
  });

  socket.on("sending message", (data) => {
    if(token){
      io.emit("message", data);
    }else{
      console.error("User is anauthorized.");
    }
  });

  socket.on("get cur board", (roomID) => {
    if(token){
      socket.broadcast.emit("get cur board", { drawingBoardData, roomID });
    }else{
      console.error("User is anauthorized.");
    }
  });

  socket.on("canvas-data", (data) => {
    if(token){
      drawingBoardData = data.base64ImageData;
      socket.broadcast.emit("canvas-data", data);
    }else{
      console.error("User is anauthorized.");
    }
  });

  socket.on("clear", () => {
    if(token){
      drawingBoardData = undefined;
      socket.broadcast.emit("clear board");
    }else{
      console.error("User is anauthorized.");
    }
  });


  socket.on("returning", (data) => {
    if(token){
      const { signal, userID } = data;
      const returningSignal = { signal, id };
      io.to(userID).emit('receiving', returningSignal);
    }else{
      console.error("User is anauthorized.");
    }
  });

  // socket.on("user leaves disconnect", () => {
  //   if(socketIdAndUserName) socketIdAndUserName = socketIdAndUserName.filter(elmt => elmt[0] !== id);
  //   if(socketIdAndUserName.length == 0) drawingBoardData = undefined;
  //   socket.broadcast.emit('user disconnect', id);
  // });

  socket.on("user leaves disconnect", (username) => {
    if(token){
      if(socketIdAndUserName) socketIdAndUserName = socketIdAndUserName.filter(elmt => elmt[1] !== username);
      if(socketIdAndUserName.length == 0) drawingBoardData = undefined;
      socket.broadcast.emit('user disconnect', username);
    }else{
      console.error("User is anauthorized.");
    }
  });

  socket.on('disconnect', () => {
    if(token){
      if(socketIdAndUserName) socketIdAndUserName = socketIdAndUserName.filter(elmt => elmt[0] !== id);
      if(socketIdAndUserName.length == 0) drawingBoardData = undefined;
      socket.broadcast.emit('user disconnect', id);
    }else{
      console.error("User is anauthorized.");
    }
  });



  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });



});


mongoose.connect(uri, { useNewUrlParser: true})
.then (() => {
    console.log("MongoDB Connected");
    return server.listen({port:5000});
})
.then ((res) => {
    console.log(`Server running at ${res.url}`);
});
