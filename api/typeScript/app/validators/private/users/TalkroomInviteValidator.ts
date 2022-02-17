import {param} from 'express-validator';
import Validator from "../../Validator";
import privacySettingService from "../../../services/PrivacySettingService";
import userService from "../../../services/UserService";


class TalkroomInviteValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.talk-room-invite-validator.username-not-string')).bail().custom(async (value, {req}) => {
                let result: any = await userService.checkUsernameExist(value);
                if (result) throw new Error(req.__('typeScript.app.http.validators.talk-room-invite-validator.username-not-found'));
                // find Receiver id
                let receiverId = await userService.findIdWithUsername(value)
                // Check requester and receiver not same
                if (req.user.id === receiverId) throw new Error(req.__('typeScript.app.http.validators.talk-room-invite.bad-request'));
                // Check receiver privacy setting
                result = await privacySettingService.userCanSendTalkRoomInvite(receiverId, req.user.id);
                if (!result) throw new Error(req.__('typeScript.app.http.validators.talk-room-invite.privacy-closed'));
            }),
        ];
    }
}

export default new TalkroomInviteValidator();
