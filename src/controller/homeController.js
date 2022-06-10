var mess = "";
var message = { "mess": mess };
let getHomePage = (req, res) => {
  try {
    return res.render("index.ejs");
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getLoginPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      return res.render("./LOG/login", { message: message });
    }
  } catch (error) {
    return res.redirect("/login");
  }
};
let getRegPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      return res.render("./REG/register", { message: message });
    }
  } catch (error) {
    console.log(error);
    return res.render("BUG");
  }
};
let getConsolePage = async (req, res) => {
  try {
    if (req.session.loggedin) {
      const username = req.session.username;
      var user = { "username": username };
      return res.render("console", { user: user, message: message });
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    req.session.loggedin = false;
    req.session.username = "";
    return res.render("BUG");
  }
};
let getBUGPage = (req, res) => {
  return res.render("BUG");
};
export default {
  getHomePage,
  getConsolePage,
  getRegPage,
  getLoginPage,
  getBUGPage
};
