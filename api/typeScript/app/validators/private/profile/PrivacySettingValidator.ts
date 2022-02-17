import Validator from "../../Validator";


const {body} = require('express-validator');


class PrivacySettingValidator extends Validator {

    handle() {
        return [
            body('whoCanSeeFriends')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanJoinGameLobby')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanJoinTalkRoom')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeGamesHistory')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeGamesAchievements')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeGamesClips')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeGamesStats')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeWhatsGameYouPlaying')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSeeBiography')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSendGameInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSendTalkRoomInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('whoCanSendMessage')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "everyOne" && value !== "friends" && value !== "noBody") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
            body('onlineStatus')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "online" && value !== "invisible" && value !== "busy") throw new Error(req.__('typeScript.app.http.validators.privacy-setting-validator.invalid-value'))
                }),
        ];
    }
}

export default new PrivacySettingValidator();
