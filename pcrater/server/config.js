require('dotenv').config();

module.exports = {
    MONGO_CONN_STRING: process.env.MONGO_URI,
    SECRET_KEY: process.env.SECRET
};