const express = require("express");

const app = express();

app.get("/", (req, res) => {

    res.send("<h1>HomePage</h1>")

});

app.listen(5001, () => {

    console.log("Server started on Port 5001");

});