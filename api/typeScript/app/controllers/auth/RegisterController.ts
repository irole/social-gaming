import {ServerError} from '../../errors/ServerError';
import {ConflictError} from '../../errors/ConflictError';
import Controller from "./Controller";
import userService from "../../services/UserService";
import translate from "../../helpers/translate";
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
            if (user) throw new ConflictError(translate(req,__filename,'process-user-exist','this email is registered before!'));
            passport.authenticate('local.register', {session: false}, (err, user): void => {
                // When res have Error
                if (err) return next(new ServerError(translate(req,__filename,'process-server-error','Server Error !')));
                // Login
                this.login(req, res, user, translate(req,__filename,'process-register-success','register Success!'), false, 201);
            })(req, res, next);

        } catch (e: any) {
            next(e);
        }
    }

}

export default new RegisterController();
