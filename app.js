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

// Add middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
// Add middleware to parse incoming JSON data
app.use(bodyParser.json());

// Create route handle for GET request to fetch data
app.get("/get_data", (request, response) => {
  const sql = "SELECT * FROM tasks ORDER BY id ASC";
  db.query(sql, (error, results) => {
    console.log(error);
    response.send(results);
  });
});

// Create route handle for POST request to add data
app.post("/add_data", (request, response) => {
  const task_name = request.body.task_name;
  const task_description = request.body.task_description;
  const task_priority = request.body.task_priority;
  const sql = `
    INSERT INTO tasks
    (task_name, task_description, task_priority)
    VALUES ("${task_name}", "${task_description}", "${task_priority}")
    `;
  db.query(sql, (error, results) => {
    response.json({
      message: "Data Added",
    });
  });
});

// Create route handle for POST request to update data
app.post("/update_data", (request, response) => {
  const variable_name = request.body.variable_name;
  const variable_value = request.body.variable_value;
  const id = request.body.id;
  const sql = `UPDATE tasks SET ${variable_name} = "${variable_value}" WHERE id = "${id}"`;
  db.query(sql, (error, results) => {
    response.json({
      message: "Data Updated",
    });
  });
});

// Create route handle for POST request to delete data
app.post("/delete_data", (request, response) => {
  const id = request.body.id;
  const sql = `DELETE FROM tasks WHERE id = '${id}'`;
  db.query(sql, (error, results) => {
    response.json({
      message: "Data Deleted",
    });
  });
});

app.listen(PORT, () => {
  console.log("Everything Running Good");
});
