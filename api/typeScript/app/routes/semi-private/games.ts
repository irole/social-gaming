// Packages
import express from 'express';
import lobbyValidator from "../../validators/semi-private/game/LobbyValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import gameController from "../../controllers/game/GameController";

const router = express.Router();

router.get('/:name', lobbyValidator.handle(), validateRequest.handle, gameController.index);
router.post('/:name', lobbyValidator.handle(), validateRequest.handle, gameController.createLobby);
router.get('/:name/lobby/:id', lobbyValidator.handle(), validateRequest.handle, gameController.lobbyIndex);
router.post('/:name/lobby/:id/left', lobbyValidator.handle(), validateRequest.handle, gameController.leftLobby);
router.get('/:name/lobby/:id/invite/:token', lobbyValidator.handle(), validateRequest.handle, gameController.inviteUserToLobby);

export {router as gameRouter};
