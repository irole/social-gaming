import {ServerError} from '../../errors/ServerError';
import {ConflictError} from '../../errors/ConflictError';
import Controller from "./Controller";
import userService from "../../services/UserService";
// Packages
const passport = require('passport');

// Controllers

class RegisterController extends Controller {

    async process(req, res, next) {
        try {
            // get email from body
            const email = req.body.email;
            // check user not exist in database
            const user = await userService.checkUserExistWithEmail(email);
            if (user) throw new ConflictError(req.__('typeScript.app.http.controllers.api.auth.register-controller.user-exist'));
            passport.authenticate('local.register', {session: false}, (err, user): void => {
                // When res have Error
                if (err) return next(new ServerError(req.__('typeScript.app.http.controllers.api.auth.register-controller.server-error')));
                // Login
                this.login(req, res, user, req.__('typeScript.app.http.controllers.api.auth.register-controller.register-success'), false, 201);
            })(req, res, next);

        } catch (e: any) {
            next(e);
        }
    }

}

export default new RegisterController();
