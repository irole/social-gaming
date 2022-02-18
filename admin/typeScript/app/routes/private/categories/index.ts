// Packages
import express from 'express';

const router = express.Router();

import {shopCategoryRouter} from './shopCategory';
import {gameCategoryRouter} from './gameCategory';

// Routes
router.use('/game', gameCategoryRouter);
router.use('/shop', shopCategoryRouter);

export {router as categoriesRouter};
