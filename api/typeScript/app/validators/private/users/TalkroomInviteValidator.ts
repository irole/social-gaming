import {param} from 'express-validator';
import Validator from "../../Validator";
import privacySettingService from "../../../services/PrivacySettingService";
import userService from "../../../services/UserService";
import translate from "../../../helpers/translate";

class TalkroomInviteValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString()
            .withMessage((value, {req}) => translate(req,__filename,'username-not-string','Username Must Be String !')).bail().custom(async (value, {req}) => {
                let result: any = await userService.checkUsernameExist(value);
                if (result) throw new Error(translate(req,__filename,'username-not-found','Username not found !'));
                // find Receiver id
                let receiverId = await userService.findIdWithUsername(value)
                // Check requester and receiver not same
                if (req.user.id === receiverId) throw new Error(translate(req,__filename,'username-bad-request','you can not send talk room invite for this user because user privacy setting was limited !'));
                // Check receiver privacy setting
                result = await privacySettingService.userCanSendTalkRoomInvite(receiverId, req.user.id);
                if (!result) throw new Error(translate(req,__filename,'username-privacy-closed','Your recipient username has restricted talkroom invitation ! '));
            }),
        ];
    }
}

export default new TalkroomInviteValidator();
