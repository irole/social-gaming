// Packages
import express from 'express';
import shopCategoryController from "../../../controllers/home/categories/ShopCategoryController";
import validateRequest from "../../../middlewares/ValidateRequest";
import shopCategoryValidator from "../../../validators/private/ShopCategoryValidator";

const router = express.Router();



router.get('/', shopCategoryController.index);
router.get('/create', shopCategoryController.create);
router.post('/create', shopCategoryValidator.handle(), validateRequest.handle, shopCategoryController.storeProcess);
router.get('/:id/edit', shopCategoryController.edit);
router.put('/:id', shopCategoryValidator.handle(), validateRequest.handle, shopCategoryController.updateProcess);
router.delete('/:id', shopCategoryController.destroyProcess);

export {router as shopCategoryRouter};
