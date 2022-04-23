import pool from "../configs/connectDB";
let authLOG = async (req, res) => {
  try {
    var userA = req.body.username;
    var pword = req.body.password;
    const [rows, fields] = await pool.execute(
      "select * from userAdmin where userA = ? AND pword = ?",
      [userA, pword]
    );
    if (rows.length == 0) {
      return res.render("./LOG/failToLogin");
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
  try {
    var userA = req.body.username;
    var pword = req.body.password;
    var cpword = req.body.confirmPassword;
    if (pword !== cpword) {
      return res.render("./REG/pwNoSame");
    } else {
      const [rows, fields] = await pool.execute(
        "select * from userAdmin where userA = ?",
        [userA]
      );
      if (rows.length === 0) {
        await pool.execute(
          "insert into userAdmin(userA, pword) values (?, ?)",
          [userA, pword]
        );
        res.render("./REG/regsuccess");
      } else {
        return res.render("./REG/existUserAdmin");
      }
    }
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let changePass = async (req, res) => {
  try {
    // var oldPass = req.body.oldPass;
    var newPass = req.body.newPass;
    var reNewPass = req.body.reNewPass;
    var oldPass = await pool.execute(
      "select pword from userAdmin where userA = ?",
      [req.session.username]
    );
    oldPass = oldPass[0][0];
    if (oldPass.pword == req.body.oldPass && newPass === reNewPass) {
      await pool.execute("update userAdmin set pword = ? where userA = ?", [
        newPass,
        req.session.username,
      ]);
      return res.render("console");
    } else {
      return res.render("failToChangePass");
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
    return res.render("index");
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