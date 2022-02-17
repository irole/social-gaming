import express from "express";
import loadProfileValidator from "../../validators/public/LoadProfileValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import publicProfileController from "../../controllers/user/PublicProfileController";

const router = express.Router();


router.get("/:username", loadProfileValidator.handle(), validateRequest.handle, publicProfileController.loadProfile);

export {router as userRouter};
