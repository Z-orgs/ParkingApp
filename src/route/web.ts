import express, { Express } from 'express';
import * as homeController from '../controller/homeController';
import * as consoleController from '../controller/consoleController';
import * as auth from '../controller/auth';
let router = express.Router();

const initWebRoute = (app: Express) => {
    //get
    router.get('/', homeController.getHomePage);
    router.get('/console', homeController.getConsolePage);
    router.get('/allUser', consoleController.getAllUser);
    router.get('/allVehicle', consoleController.getAllVehicle);
    router.get('/detail/user/:userId', consoleController.getDetailPageU);
    router.get('/detail/vehicle/:idV', consoleController.getDetailPageV);
    router.get('/edit-user/:id', consoleController.editUser);
    router.get('/edit-vehicle/:idV', consoleController.editVehicle);
    router.get('/login', homeController.getLoginPage);
    router.get('/register', homeController.getRegPage);
    router.get('/logout', auth.logout);
    //post
    router.post('/delete-vehicle', consoleController.deleteVehicle);
    router.post('/delete-user', consoleController.deleteUser);
    router.post('/add-new-turn', consoleController.addNewTurn);
    router.post('/add-new-user', consoleController.addNewUser);
    router.post('/add-new-vehicle', consoleController.addNewVehicle);
    router.post('/update-user', consoleController.updateUser);
    router.post('/update-vehicle', consoleController.updateVehicle);
    router.post('/pay-user', consoleController.payment);
    router.post('/allUser', consoleController.searchUser);
    router.post('/allVehicle', consoleController.searchVehicle);
    router.post('/authLOG', auth.authLOG);
    router.post('/authREG', auth.authREG);
    router.post('/changePass', auth.changePass);
    router.post('/change-price', consoleController.changePrice);
    return app.use('/', router);
};
export default initWebRoute;
