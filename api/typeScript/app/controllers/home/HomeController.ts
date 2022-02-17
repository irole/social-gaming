import Controller from "./Controller";
import userService from "../../services/UserService";

class HomeController extends Controller {

    async allUsers(req, res, next) {
        try {
            let query: any = {};
            query.username = new RegExp(req.query.username, 'gi');
            let users = await userService.find({...query}, null, {createdAt: -1});
            return this.success({users}, res);
        } catch (e: any) {
            next(e);
        }
    }
}

export default new HomeController();
