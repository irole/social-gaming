import {param} from 'express-validator';
import Validator from "../../Validator";
import userService from "../../../services/UserService";
import userRelationshipService from "../../../services/UserRelationshipService";
import translate from "../../../helpers/translate";

class RequestValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString()
            .withMessage((value, {req}) => translate(req,__filename,'username-not-string','username must be letters !'))
            .bail().custom(async (value, {req}) => {
                // find Receiver id
                let receiverId = await userService.findIdWithUsername(value)
                // Check requester and receiver not same
                if (req.user.id === receiverId) throw new Error(translate(req,__filename,'username-bad-request','you can not request to your Self ! '));
                // find user isGuest
                let isGuest = await userService.isGuest(receiverId);
                // Check user guest
                if (isGuest) throw new Error(translate(req,__filename,'username-guest-user-request','You can not send Request to guest User !'))
                // Send requester id and receiver id for find user relationship table
                await userRelationshipService.findUsers(req.user.id, receiverId);
                // Check users are friends
                if (userRelationshipService.getRequesterFriendsList().includes(userRelationshipService.getReceiverId())) throw new Error(translate(req,__filename,'username-users-are-friends','You are already friends !'));
                // Check requester already send request (request again)
                if (userRelationshipService.getRequesterFriendsPendingList().includes(userRelationshipService.getReceiverId()) || userRelationshipService.getReceiverFriendsPendingList().includes(userRelationshipService.getRequesterId())) throw new Error(translate(req,__filename,'username-already-request','You are already requested !'));
                // Check user Blocked You or you Blocked user
                if (userRelationshipService.getRequesterBlockedUsersList().includes(userRelationshipService.getReceiverId()) || userRelationshipService.getRequesterBlockedByList().includes(userRelationshipService.getReceiverId())) throw new Error(translate(req,__filename,'username-blocked-user','You cant send Request to this User !'));
            }),
        ];
    }
}

export default new RequestValidator();
