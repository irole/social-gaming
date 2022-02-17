import {param} from 'express-validator';
import Validator from "../../Validator";
import userService from "../../../services/UserService";
import userRelationshipService from "../../../services/UserRelationshipService";
import translate from "../../../helpers/translate";

class UnBlockValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString()
            .withMessage((value, {req}) => translate(req,__filename,'username-not-string','Username Must Be String !'))
            .bail().custom(async (value, {req}) => {
                // find user id with username
                const receiverId = await userService.findIdWithUsername(value);
                // Send requester id and receiver id for find user relationship table
                await userRelationshipService.findUsers(req.user.id, receiverId);
                // check receiver in blocked list
                if (!userRelationshipService.getRequesterBlockedUsersList().includes(userRelationshipService.getReceiverId())) throw new Error(translate(req,__filename,'username-not-found-in-block-list','Your Requested User not In your block List ! '));
            }),
        ];
    }
}

export default new UnBlockValidator();
