import express from "express";
import homeController from "../controller/homeController";
import consoleController from "../controller/consoleController.js";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/console", consoleController.getAllUser);
  router.get("/detail/user/:userId", consoleController.getDetailPage);
  router.post("/add-new-user", consoleController.addNewUser);
  router.post("/add-new-vehicle", consoleController.addNewVehicle);
  return app.use("/", router);
};
export default initWebRoute;
