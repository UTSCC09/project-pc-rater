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


let socketIdAndUserName = [];

let drawingBoardData;


const io = socket(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


httpServer.listen(8000, () => console.log('http server for the sockets is running on port 8000'));

io.on('connection', socket => {

  const id = socket.id;

  socket.on("check if user is in room", (data) => {
    const { username, roomID } = data;
    if(!socketIdAndUserName.map(elmt => elmt[1]).includes(username)){
      socketIdAndUserName.push([id, username, roomID]);
      io.to(id).emit("user is not in room yet");
    }else{
      io.to(id).emit("user is already in room");
    }
  });


  socket.on("joining", (roomID) => {
      socket.emit("init", socketIdAndUserName.filter(elmt => elmt[2] === roomID).filter(elmt => elmt[0] !== id).map(elmt => [elmt[0], elmt[1]]));
      io.to(id).emit("socket id", id);
  });


  socket.on("sending", (data) => {
    const { userID, username, sig, userOnCallID } = data;
    const welcomeSignal = { sig, userOnCallID, username };
    io.to(userID).emit('joined room', welcomeSignal);
  });

  socket.on("sending message", (data) => {
    io.emit("message", data);
  });

  socket.on("get cur board", (roomID) => {
    socket.broadcast.emit("get cur board", { drawingBoardData, roomID });
  });

  socket.on("canvas-data", (data) => {
    drawingBoardData = data.base64ImageData;
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("clear", () => {
    drawingBoardData = undefined;
    socket.broadcast.emit("clear board");
  });


  socket.on("returning", (data) => {
    const { signal, userID } = data;
    const returningSignal = { signal, id };
    io.to(userID).emit('receiving', returningSignal);
  });

  socket.on("user leaves disconnect", () => {
    if(socketIdAndUserName) socketIdAndUserName = socketIdAndUserName.filter(elmt => elmt[0] !== id);
    if(socketIdAndUserName.length == 0) drawingBoardData = undefined;
    socket.broadcast.emit('user disconnect', id);
  });

  socket.on('disconnect', () => {
    if(socketIdAndUserName) socketIdAndUserName = socketIdAndUserName.filter(elmt => elmt[0] !== id);
    if(socketIdAndUserName.length == 0) drawingBoardData = undefined;
    socket.broadcast.emit('user disconnect', id);
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