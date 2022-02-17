import Validator from "../../Validator";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class NotificationSettingValidator extends Validator {

    handle() {
        return [
            body('receiveFriendsGettingOnline')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(translate(req,__filename,'receive-friends-getting-online-invalid-value','please select valid value'))
                }),
            body('receiveNewMessage')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(translate(req,__filename,'receive-new-message-invalid-value','please select valid value'))
                }),
            body('receiveAchievementsUnlocked')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(translate(req,__filename,'receive-achievements-unlocked-invalid-value','please select valid value'))
                }),
            body('receiveTalkRoomInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(translate(req,__filename,'receive-talk-room-invite-invalid-value','please select valid value'))
                }),
            body('receiveGameInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(translate(req,__filename,'receive-game-invite-invalid-value','please select valid value'))
                }),
        ];
    }
}

export default new NotificationSettingValidator();
