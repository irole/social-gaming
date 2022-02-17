import express from 'express';
import {searchRouter} from "./search";
import {authRouter} from "./auth";
import {userRouter} from "./users";
import {lobbyRouter} from "./lobby";
// Packages
const router = express.Router();


router.use('/search', searchRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/lobby', lobbyRouter);

export {router as publicRouter};
