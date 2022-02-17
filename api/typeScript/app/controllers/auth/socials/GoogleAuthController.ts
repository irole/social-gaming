import Controller from "../Controller";
import translate from "../../../helpers/translate";

const jwt = require('jsonwebtoken');

class GoogleAuthController extends Controller {

    async callBack(req, res, next) {
        try {
            this.login(req, res, req.user, translate(req,__filename,'login-success','you are login Successfully!'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new GoogleAuthController();
