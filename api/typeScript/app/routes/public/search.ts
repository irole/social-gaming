import express from 'express';
import searchValidator from "../../validators/public/SearchValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import homeController from "../../controllers/home/HomeController";

const router = express.Router();


router.get('/', searchValidator.handle(), validateRequest.handle, homeController.allUsers);

export {router as searchRouter};
