import {NotFoundError} from '../../errors/NotFoundError';
import Controller from "./Controller";
import userService from "../../services/UserService";
import userRelationshipService from "../../services/UserRelationshipService";
import translate from "../../helpers/translate";


class PrivateChatController extends Controller {
    async index(req, res, next) {
        let username = req.params.username;
        let result = await userService.findIdWithUsername(username);
        if (result && result.code === 404) throw new NotFoundError(translate(req,__filename,'index-user-not-found','user not found'));
        const populate = {path: 'friendsRequestList', select: 'profilePictureVerify profilePicture username'};
        let userRelations = await userRelationshipService.findOne({user: req.user.id}, populate);
        let requestsInfo: any = null;
        if (userRelations.friendsRequestList.length != 0) {
            requestsInfo = userRelations.friendsRequestList;
        }

        let friendsList = await userRelationshipService.getFriendList(req.user.id);

        res.render('home/private-chat', {requestsInfo, friendsList});
    }
}

export default new PrivateChatController();
