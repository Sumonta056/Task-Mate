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



exports.register = (req,res) => {

    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const repass = req.body.repass;

    db.query('SELECT email FROM users WHERE email = ?',[email] ,(error ,results)=> {

        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('registration' , {
                message : 'Email Address Already Registered'
            })
        }else if(password != repass){
            return res.render('registration' , {
                message : '! Passwords Do Not Matched'
            })
        }


        db.query(`INSERT INTO users SET ? ` , {name:name, email:email, password: password}, (error,results) => {

            if (error) {
                console.log(error);
            } else {
                return res.render('index' , {
                    message : 'User Registration Successful'
                })
            
            }
            
            

        }
        
         );
    });


    // res.send("Form Submitted");

}