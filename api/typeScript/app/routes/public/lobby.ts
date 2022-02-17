import express from "express";
import lobbyChatController from "../../controllers/game/lobby/LobbyChatController";

const router = express.Router();

// Validators

router.get("/chat/:groupName", lobbyChatController.index);


export {router as lobbyRouter};
