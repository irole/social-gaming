
import {ClientError} from '../../errors/ClientError';
import Controller from "./Controller";
import translate from "../../helpers/translate";
// Packages
const passport = require('passport');


class LoginController extends Controller {

    async process(req, res, next) {
        try {
            passport.authenticate('local.login', {session: false}, (err, user) => {

                // When res have Error
                if (err) return next(new ClientError(translate(req,__filename,'process-info-wrong','email or password was wrong !'), 401));
                // Login
                this.login(req, res, user, translate(req,__filename,'process-login-success','you are login Successfully!'));
            })(req, res, next);

        } catch (e: any) {
            next(e);
        }
    }
}

export default new LoginController();
