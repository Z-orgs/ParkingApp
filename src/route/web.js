import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/console", function (req, res) {
    res.render("console.ejs");
  });
  return app.use("/", router);
};
export default initWebRoute;
