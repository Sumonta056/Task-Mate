const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const path = require("path");
const PORT = 5001;
const db = require("./routes/db-config");

app.use("/js" ,express.static(__dirname + "/public/js"));
app.use("/css" ,express.static(__dirname + "/public/css"));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(cookie());
app.use(express.json());


db.connect((err) => {

    if (err) throw err;
    console.log("Database Connected");
})


app.use('/' , require('./routes/pages'));
app.use('/api' , require("./controllers/auth"));

app.listen(PORT);





















// const express = require("express");
// const app = express();
// const cookie = require("cookie-parser");



// const db = require("./routes/db-config");


// app.set('view engine', 'ejs');
// app.set('views', './views');
// app.use(cookie());
// app.use(express.urlencoded({ extended:false }));
// app.use(express.json());  // Parse URL encoded Bodies (as sent by HTML forms)

// // checking connections
// db.connect( (error) => {

//     if (error) {
//         console.log(error);
//     }else {
//         console.log("Connected to taskmate");
//     }
// })


// // Setting Up Routes
// app.use('/' , require('./routes/pages'));
// app.use("/api" , require('./controllers/auth'));



// // Listern to Port
// app.listen(5001, () => {

//     console.log("Server started on Port 5001");

// });