import Validator from "../../Validator";


const {body} = require('express-validator');

class NotificationSettingValidator extends Validator {

    handle() {
        return [
            body('receiveFriendsGettingOnline')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(req.__('typeScript.app.http.validators.notification-setting-validator.invalid-value'))
                }),
            body('receiveNewMessage')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(req.__('typeScript.app.http.validators.notification-setting-validator.invalid-value'))
                }),
            body('receiveAchievementsUnlocked')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(req.__('typeScript.app.http.validators.notification-setting-validator.invalid-value'))
                }),
            body('receiveTalkRoomInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(req.__('typeScript.app.http.validators.notification-setting-validator.invalid-value'))
                }),
            body('receiveGameInvite')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "false" && value !== "true" ) throw new Error(req.__('typeScript.app.http.validators.notification-setting-validator.invalid-value'))
                }),
        ];
    }
}

export default new NotificationSettingValidator();
