import express from "express";
import homeController from "../controller/homeController";
import consoleController from "../controller/consoleController.js";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/console", consoleController.getAllUser);
  return app.use("/", router);
};
export default initWebRoute;
