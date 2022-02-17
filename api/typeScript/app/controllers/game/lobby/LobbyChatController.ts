import LobbyController from "./LobbyController";
import userRelationshipService from "../../../services/UserRelationshipService";


class LobbyChatController extends LobbyController {
    async index(req, res, next) {

        let userRelations: any = null;
        let requestsInfo: any = null;
        let friendsList: any = [];
        if (!req.user.isGuest) {
            const populate = {path: 'friendsRequestList', select: 'profilePictureVerify profilePicture username'};
            userRelations = await userRelationshipService.findOne({user: req.user.id}, populate);
            //console.log(populate);

            if (userRelations.friendsRequestList.length != 0) {
                requestsInfo = userRelations.friendsRequestList;
            }

            friendsList = await userRelationshipService.getFriendList(req.user.id);
        }


        res.render('home/lobby-chat', {requestsInfo, friendsList});
    }
}

export default new LobbyChatController();
