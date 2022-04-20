var express = require("express");
var bodyparser = require("body-parser");
const PORT = process.env.PORT || 3000;
var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var server = app.listen(PORT, function () {
  console.log("Server listening on port " + server.address().port);
});
module.exports = app;
