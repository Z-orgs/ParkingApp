var mess = "";
let getHomePage = (req, res) => {
  return res.render("index.ejs");
};
let getLoginPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      return res.render("./LOG/login", { message: mess });
    }
  } catch (error) {
    return res.redirect("login");
  }
};
let getRegPage = function (req, res) {
  try {
    if (req.session.loggedin) {
      return res.redirect("/console");
    } else {
      return res.render("./REG/register", { message: mess });
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
      return res.render("console", { user: user, message: mess });
    } else {
      return res.redirect("login");
    }
  } catch (error) {
    console.log(error);
    req.session.loggedin = false;
    req.session.username = "";
    return res.render("BUG");
  }
};
export default {
  getHomePage,
  getConsolePage,
  getRegPage,
  getLoginPage
};
