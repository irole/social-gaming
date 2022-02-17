
import {ClientError} from '../../errors/ClientError';
import {ServerError} from '../../errors/ServerError';
import {NotFoundError} from '../../errors/NotFoundError';
import {ConflictError} from '../../errors/ConflictError';
import Controller from "./Controller";
import userService from "../../services/UserService";
// Packages
const passport = require('passport');


class GuestController extends Controller {

    async process(req, res, next) {
        try {
            if (req.user) throw new ClientError('you are already login!');
            req.body.email = 'guest';
            req.body.password = 'guest';
            passport.authenticate('local.guest.register', {session: false}, (err, user): void => {
                if (err) return next(new ServerError('guest register Not Complete Please try again later'));
                this.login(req, res, user, 'login as guest successfully!', true, 201);
            })(req, res, next);
        } catch (e: any) {
            next(e);
        }
    }

    async convertGuestToUser(req, res, next) {
        try {
            if (req.user && req.user.isGuest) {

                // get email and password from user
                let {
                    email,
                    password
                } = req.body;
                // check user not exist in database
                const user = await userService.checkUserExistWithEmail(email);
                if (user) throw new ConflictError('this email is registered before!');
                // convert guest to user process
                let convertResult = await userService.convertGuestToUser(req.user._id, email, password);
                // when guest not found in users
                if (convertResult === 404) throw new NotFoundError('this guest not Found');
                // when guest convert to user
                if (convertResult === 200) return this.success('convert guest to user successfully', res);
                // when sever Error
                if (convertResult === 500) throw new ServerError('Server Error !');
            }
            throw new ClientError('access denied !', 403);
        } catch (e: any) {
            next(e);
        }
    }

}

export default new GuestController();
