import {param} from 'express-validator';
import Validator from "../../Validator";
import userService from "../../../services/UserService";
import userRelationshipService from "../../../services/UserRelationshipService";


class UnBlockValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.un-block-validator.username-not-string')).bail().custom(async (value, {req}) => {
                // find user id with username
                const receiverId = await userService.findIdWithUsername(value);
                // Send requester id and receiver id for find user relationship table
                await userRelationshipService.findUsers(req.user.id, receiverId);
                // check receiver in blocked list
                if (!userRelationshipService.getRequesterBlockedUsersList().includes(userRelationshipService.getReceiverId())) throw new Error(req.__('typeScript.app.http.validators.un-block-validator.user-not-found-in-block-list'));
            }),
        ];
    }
}

export default new UnBlockValidator();
