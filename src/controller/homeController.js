let getHomePage = (req, res) => {
  //logic
  return res.render("index.ejs");
};
module.exports = {
  getHomePage,
};
