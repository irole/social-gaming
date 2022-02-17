
import {ClientError} from '../../errors/ClientError';
import Controller from "./Controller";
// Packages
const passport = require('passport');


class LoginController extends Controller {

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', {session: false}, (err, user) => {

                // When res have Error
                if (err) return next(new ClientError(req.__('typeScript.app.http.controllers.api.auth.login-controller.info-wrong'), 401));
                // Login
                this.login(req, res, user, req.__('typeScript.app.http.controllers.api.auth.login-controller.login-success'));
            })(req, res, next);

        } catch (e: any) {
            next(e);
        }
    }
}

export default new LoginController();
