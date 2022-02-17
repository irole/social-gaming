// Packages
import express from 'express';

const router = express.Router();

// Middlewares
import gameCategoryController from "../../../controllers/home/categories/GameCategoryController";
import gameCategoryValidator from "../../../validators/private/GameCategoryValidator";
import validateRequest from "../../../middlewares/ValidateRequest";

// validators


router.get('/', gameCategoryController.index);
router.get('/create', gameCategoryController.create);
router.post('/create', gameCategoryValidator.handle(), validateRequest.handle, gameCategoryController.storeProcess);
router.get('/:id/edit', gameCategoryController.edit);
router.put('/:id', gameCategoryValidator.handle(), validateRequest.handle, gameCategoryController.updateProcess);
router.delete('/:id', gameCategoryController.destroyProcess);

export {router as gameCategoryRouter};
