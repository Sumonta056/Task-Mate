const mysql = require("mysql");
const jwt = require("jsonwebtoken");


require('dotenv').config();
const db = mysql.createConnection({

    // encryption using DOT ENV
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
   
});



exports.login = (req,res) => {

    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * from users where email = ? and password = ?`, [email, password],function(error,results,fields) {


        if(results.length > 0) {
            return res.render('index' , {
                message : 'Login Successful'
            })
        }else {
            return res.render('login' , {
                message : 'Login Failed'
            })
        }
    })


    // res.send("Form Submitted");

}