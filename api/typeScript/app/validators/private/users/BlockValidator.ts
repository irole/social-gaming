import {param} from 'express-validator';
import Validator from "../../Validator";
import userRelationshipService from "../../../services/UserRelationshipService";
import userService from "../../../services/UserService";


class BlockValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.block-validator.username-not-string')).bail().custom(async (value, {req}) => {

                // find Receiver id
                let receiverId = await userService.findIdWithUsername(value)
                // Check requester and receiver not same
                if (req.user.id === receiverId) throw new Error(req.__('typeScript.app.http.validators.block-validator.bad-request'));
                // Send requester id and receiver id for find user relationship table
                await userRelationshipService.findUsers(req.user.id, receiverId);
                // conflict on already blocked
                if (userRelationshipService.getRequesterBlockedUsersList().includes(userRelationshipService.getReceiverId())) throw new Error(req.__('typeScript.app.http.validators.block-validator.blocked-before'));
            }),
        ];
    }
}

export default new BlockValidator();
