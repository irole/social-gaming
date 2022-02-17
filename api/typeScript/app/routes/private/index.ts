// Packages
import express from "express";
import {profileRouter} from "./profile";
import {chatRouter} from "./chat";
import {userRouter} from "./users";

const router = express.Router();


router.use('/profile', profileRouter);
router.use('/chat', chatRouter);
router.use('/users', userRouter);

export {router as privateRouter};
