import {NotFoundError} from '../../errors/NotFoundError';
import Controller from "./Controller";
import userService from "../../services/UserService";
import translate from "../../helpers/translate";


class PublicProfileController extends Controller {
    async loadProfile(req, res, next) {
        try {
            // Get username From params
            let username = req.params.username;
            let user: any = await userService.checkUsernameExist(username);
            if (!user) throw new NotFoundError(translate(req,__filename,'load-profile-not-found','user not Found !'));
            user = await userService.findOne({username}, ['userRelationship']);
            if (req.user && req.user.id === user.id) return res.redirect('/profile'); // Must be Change With React Developer
            return this.success({user: await this.filterPublicUser(user, req)}, res);
        } catch (e: any) {
            next(e);
        }
    }
}

export default new PublicProfileController();
