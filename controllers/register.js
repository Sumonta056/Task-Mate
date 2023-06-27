const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  console.log(req.body);

  const { name, email, password: Npassword, repass } = req.body;

  if (!email || !Npassword)
    return res.json({
      status: "error",
      error: "Please Enter your email address and password ",
    });
  else {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (error, result) => {
        if (error) {
          throw error;
        }

        if (result[0])
          return res.json({
            status: "error",
            error: "Email Address Already Registered",
          });
        else {
          const password = await bcrypt.hash(Npassword, 8);
          db.query(
            `INSERT INTO users SET ? `,
            { name: name, email: email, password: password },
            (error, result) => {
              if (error) {
                console.log(error);
              } else {
                return res.json({
                  status: "success",
                  success: "Registration Successful",
                });

                return
              }
            }
          );
        }
      }
    );
  }
};

module.exports = register;
