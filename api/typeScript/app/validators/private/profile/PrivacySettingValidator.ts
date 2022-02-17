import Validator from "../../Validator";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class PrivacySettingValidator extends Validator {

    handle() {
        return [
            body('whoCanSeeFriends')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-friends-invalid-value','your selected item is invalid'))
                }),
            body('whoCanJoinGameLobby')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-join-game-lobby-invalid-value','your selected item is invalid'))
                }),
            body('whoCanJoinTalkRoom')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-join-talk-room-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeGamesHistory')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-games-history-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeGamesAchievements')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-games-achievements-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeGamesClips')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-games-clips-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeGamesStats')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-games-stats-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeWhatsGameYouPlaying')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-whats-game-you-playing-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSeeBiography')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-see-biography-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSendGameInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-send-game-invite-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSendTalkRoomInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-send-talk-room-invite-invalid-value','your selected item is invalid'))
                }),
            body('whoCanSendMessage')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(translate(req,__filename,'who-can-send-message-invalid-value','your selected item is invalid'))
                }),
            body('onlineStatus')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "online" && value !== "invisible" && value !== "busy") throw new Error(translate(req,__filename,'online-status-invalid-value','your selected item is invalid'))
                }),
        ];
    }
}

export default new PrivacySettingValidator();
