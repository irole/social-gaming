import express from 'express';
import requestValidator from "../../validators/private/users/RequestValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import actionUsernameController from "../../controllers/user/ActionUsernameController";
import unBlockValidator from "../../validators/private/users/UnBlockValidator";
import blockValidator from "../../validators/private/users/BlockValidator";

const router = express.Router();


router.get('/:username/request', requestValidator.handle(), validateRequest.handle, actionUsernameController.sendFriendRequest);
router.get('/:username/block', blockValidator.handle(), validateRequest.handle, actionUsernameController.blockUser);
router.get('/:username/unblock', unBlockValidator.handle(), validateRequest.handle, actionUsernameController.unBlockUser);
// Process not complete
// router.get('/:username/talkroom-invite', talkroomInviteValidator.handle(), actionUsernameController.sendTalkRoomInvite);
// router.get('/:username/game-invite', actionUsernameController.sendGameInvite);
// router.get('/:username/send-message', actionUsernameController.sendMessage);
// router.post('/:username/report', reportUserValidator.handle(), actionUsernameController.reportUser);

export {router as userRouter};
