import express from "express";
import {gameRouter} from "./games";
// Packages
const router = express.Router();

router.use('/games', gameRouter);

export {router as semiPrivateRouter};
