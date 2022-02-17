// Packages
import express from "express";
import privateChatController from "../../controllers/chat/PrivateChatController";

const router = express.Router();

router.get('/:username', privateChatController.index);

export {router as chatRouter};
