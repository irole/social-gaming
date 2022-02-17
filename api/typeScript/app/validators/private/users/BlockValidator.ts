import {param} from 'express-validator';
import Validator from "../../Validator";
import userRelationshipService from "../../../services/UserRelationshipService";
import userService from "../../../services/UserService";
import translate from "../../../helpers/translate";

class BlockValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString().withMessage((value, {req}) => translate(req,__filename,'username-not-string','Username Must Be String'))
            .bail().custom(async (value, {req}) => {
                // find Receiver id
                let receiverId = await userService.findIdWithUsername(value)
                // Check requester and receiver not same
                if (req.user.id === receiverId) throw new Error(translate(req,__filename,'username-bad-request','you can not block your self ! '));
                // Send requester id and receiver id for find user relationship table
                await userRelationshipService.findUsers(req.user.id, receiverId);
                // conflict on already blocked
                if (userRelationshipService.getRequesterBlockedUsersList().includes(userRelationshipService.getReceiverId())) throw new Error(translate(req,__filename,'username-blocked-before','you blocked this user before !'));
            }),
        ];
    }
}

export default new BlockValidator();
