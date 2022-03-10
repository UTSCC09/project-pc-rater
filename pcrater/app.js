const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');

// Connection URI
const uri = "mongodb+srv://pcraters:appleorange123@cluster0.zvwmr.mongodb.net/test";

const client = new MongoClient(uri);

const bodyParser = require('body-parser');
const app = express();

app.use(session({
    secret: 'please change this secret',
    resave: false,
    saveUninitialized: true,
}));


async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to Mongo");

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


const http = require('http');
const PORT = 3001;

http.createServer(app).listen(PORT, function (err) {
    run();
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
