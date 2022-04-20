import express from "express";
import homeController from "../controller/homeController";
import consoleController from "../controller/consoleController.js";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/console", (req, res) => {
    res.render("console.ejs");
  });
  router.post("/delete-vehicle", consoleController.deleteVehicle);
  router.post("/delete-user", consoleController.deleteUser);
  router.post("/add-new-turn", consoleController.addNewTurn);
  router.get("/allUser", consoleController.getAllUser);
  router.get("/allVehicle", consoleController.getAllVehicle);
  router.get("/detail/user/:userId", consoleController.getDetailPageU);
  router.get("/detail/vehicle/:idV", consoleController.getDetailPageV);
  router.post("/add-new-user", consoleController.addNewUser);
  router.post("/add-new-vehicle", consoleController.addNewVehicle);
  return app.use("/", router);
};
export default initWebRoute;
