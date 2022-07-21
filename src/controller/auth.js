import pool from "../configs/connectDB";
String.prototype.hashCode = function () {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};
var mess = "";
var message = { "mess": mess };
let authLOG = async (req, res) => {
  try {
    var userA = req.body.username;
    var pword = req.body.password;
    pword = pword.hashCode();
    const [rows, fields] = await pool.execute(
      "select * from userAdmin where userA = ? AND pword = ?",
      [userA, pword]
    );
    if (rows.length == 0) {
      message.mess = "Login failed please check again";
      return res.render("./LOG/login", { message: message });
    } else {
      req.session.loggedin = true;
      req.session.username = userA;
      return res.redirect("/console");
    }
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let authREG = async (req, res) => {
  // try {
  //   var userA = req.body.username;
  //   var pword = req.body.password;
  //   var cpword = req.body.confirmPassword;
  //   pword = pword.hashCode();
  //   cpword = cpword.hashCode();
  //   if (pword !== cpword) {
  //     message.mess = "Passwords are not the same";
  //     return res.render("./REG/register", { message: message });
  //   } else if (pword === cpword) {
  //     const [rows, fields] = await pool.execute(
  //       "select * from userAdmin where userA = ?",
  //       [userA]
  //     );
  //     if (rows.length === 0) {
  //       await pool.execute(
  //         "insert into userAdmin(userA, pword) values (?, ?)",
  //         [userA, pword]
  //       );
  //       message.mess = "Sign Up Success";
  //       res.render("./LOG/login", { message: message });
  //     } else {
  //       message.mess = "Username already exists";
  //       return res.render("./REG/register", { message: message });
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  //   return res.render("BUG");
  // }
};
let changePass = async (req, res) => {
  try {
    const username = req.session.username;
    var user = { "username": username };
    var newPass = req.body.newPass.hashCode();
    var reNewPass = req.body.reNewPass.hashCode();
    var oldPass = await pool.execute(
      "select pword from userAdmin where userA = ?",
      [req.session.username]
    );
    oldPass = oldPass[0][0];
    if (parseInt(oldPass.pword) === req.body.oldPass.hashCode()) {
      if (newPass === reNewPass) {
        await pool.execute("update userAdmin set pword = ? where userA = ?", [
          newPass,
          req.session.username,
        ]);
        message.mess = "Change password successfully";
        return res.render("console", { user: user, message: message });
      } else {
        message.mess = "New passwords are not the same";;
        return res.render("console", { user: user, message: message });
      }
    } else {
      message.mess = "Old password is not correct.";
      return res.render("console", { user: user, message: message });
    }
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let logout = (req, res) => {
  try {
    req.session.loggedin = false;
    req.session.username = "";
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
module.exports = {
  authLOG,
  authREG,
  changePass,
  logout,
};