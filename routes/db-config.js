
const mysql = require("mysql");

require('dotenv').config();

const db = mysql.createConnection({

    // encryption using DOT ENV
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
   
});

module.exports = db;