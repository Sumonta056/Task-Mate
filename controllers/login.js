const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password)
    return res.json({
      status: "error",
      error: "Please Enter your email address and password ",
    });
  else {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          throw error;
        }

        if (
          !result.length||
          !(await bcrypt.compare(password, result[0].password))
        ) {
          return res.json({
            status: "error",
            error: "Invalid password and Email address",
          });
        }

        else {

            const token = jwt.sign({id : result[0].id} , process.env.JWT_SECRET , {
                expiresIn: process.env.JWT_EXPIRES,
            })

            const cookieOptions = {
                expiresIn : new Date(Date.now() + process.env.COOKIE_EXPIRES *24*3600*1000),
                httpOnly: true
            }

            res.cookie("UserRegisterd",token,cookieOptions);
            return res.json({status: "success", success: "Login Successful"});
        }
      }
    );
  }
};

module.exports = login;
