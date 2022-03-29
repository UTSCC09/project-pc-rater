//credits: 
//GraphQL Server (MERNG): #1 Setting Up Database & Server https://www.youtube.com/watch?v=71-CtIcmDJQ
//React Group Video Chat | simple-peer webRTC: https://www.youtube.com/watch?v=R1sfHPwEH7A&list=PLK0STOMCFms4nXm1bRUdjhPg0coxI2U6h&index=3

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
const cors = require('cors');
const client = new MongoClient(uri);


const server = new ApolloServer({
  typeDefs,
  resolvers
});

const express = require("express");
const app = express();
app.use(cors());
const http = require("http");
const httpServer = http.createServer(app);
const socket = require("socket.io");

const users = {};

const socketToRoom = {};

const io = socket(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


httpServer.listen(8000, () => console.log('http server for the sockets is running on port 8000'));

io.on('connection', socket => {
  socket.on("join room", roomID => {
      if (users[roomID]) {
          const length = users[roomID].length;
          users[roomID].push(socket.id);
      } else {
          users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

      socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
      io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
      io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
          room = room.filter(id => id !== socket.id);
          users[roomID] = room;
      }
      socket.broadcast.emit('user left', socket.id);
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