const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");


require('dotenv').config();
// Creating SQL Connection
const db = mysql.createConnection({

    // encryption using DOT ENV
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
   
});

// Setting public directory for storing CSS , JS of Frontend
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('views', path.join(__dirname, 'views'));

// Parse URL encoded Bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

// Setting Views for storing HTML files
app.set('view engine', 'hbs');

// checking connections
db.connect( (error) => {

    if (error) {
        console.log(error);
    }else {
        console.log("Connected to taskmate");
    }
})


// Setting Up Routes
app.use('/' , require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001, () => {

    console.log("Server started on Port 5001");

});