const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 5001;
const db = require("./routes/db-config");

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());

app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));

// Add middleware for parse incoming request body
app.use(bodyParser.urlencoded({ extended: false }));

// Add middleware for parse incoming data in JSON
app.use(bodyParser.json());

//Crate Route handle get request
app.get("/get_data", (request, response) => {
  const sql = `SELECT * FROM sample_data ORDER BY id ASC`;

  db.query(sql, (error, results) => {
    console.log(error);
    response.send(results);
  });
});

//Create Route for Insert Data Operation
app.post("/add_data", (request, response) => {
  const first_name = request.body.first_name;

  const last_name = request.body.last_name;

  const age = request.body.age;

  const sql = `
	INSERT INTO sample_data 
	(first_name, last_name, age) 
	VALUES ("${first_name}", "${last_name}", "${age}")
	`;

  db.query(sql, (error, results) => {
    response.json({
      message: "Data Added",
    });
  });
});

//Create Route for Update Data Operation
app.post("/update_data", (request, response) => {
  const variable_name = request.body.variable_name;

  const variable_value = request.body.variable_value;

  const id = request.body.id;

  const sql =
    `UPDATE sample_data SET ` +
    variable_name +
    `= "${variable_value}" WHERE id = "${id}"`;

  db.query(sql, (error, results) => {
    response.json({
      message: "Data Updated",
    });
  });
});

//Create Route for Delete data operation
app.post("/delete_data", (request, response) => {
  const id = request.body.id;

  const sql = `DELETE FROM sample_data WHERE id = '${id}'`;

  db.query(sql, (error, results) => {
    response.json({
      message: "Data Deleted",
    });
  });
});

app.listen(PORT);
