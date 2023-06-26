const express = require("express");
const mysql = require("mysql");

const app = express();

// Creating SQL Connection
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmate'
});

// checking connections
db.connect( (error) => {

    if (error) {
        console.log(error);
    }else {
        console.log("Connected to taskmate");
    }
})


app.get("/", (req, res) => {

    res.send("<h1>HomePage</h1>")

});

app.listen(5001, () => {

    console.log("Server started on Port 5001");

});