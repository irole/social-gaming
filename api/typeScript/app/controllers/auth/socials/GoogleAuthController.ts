import Controller from "../Controller";

const jwt = require('jsonwebtoken');

class GoogleAuthController extends Controller {

    async callBack(req, res, next) {
        try {
            this.login(req, res, req.user, req.__('typeScript.app.http.controllers.api.auth.socials.google-auth-controller.login-success'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new GoogleAuthController();
