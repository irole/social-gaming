import {NotFoundError} from '../../errors/NotFoundError';
import {ClientError} from '../../errors/ClientError';
import {ServerError} from '../../errors/ServerError';
import Controller from "./Controller";
import resetPasswordService from "../../services/ResetPasswordService";
import userService from "../../services/UserService";
import translate from "../../helpers/translate";
// Packages
const uniqueString = require('unique-string');

// Controllers

class ResetPasswordController extends Controller {
    async index(req, res, next) {
        try {
            const {token} = req.params;
            let resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError(translate(req,__filename,'index-invalid-link-404','Link is not validate'));
            if (resetPassword === 403) throw new ClientError(translate(req,__filename,'index-invalid-link-409','Link is not validate'), 403);
            // Do Something
            return this.success(translate(req,__filename,'index-valid-link','Link is valid'), res);
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            const token = req.params.token;
            let resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError(translate(req,__filename,'process-invalid-link-404','Link is not validate'));
            if (resetPassword === 403) throw new ClientError(translate(req,__filename,'process-invalid-link-409','Link is not validate'), 403);
            // Get Input Value
            const {password} = req.body;
            // Find & Update User and Set Bcrypt Password
            await userService.findOneAndUpdate({email: resetPassword.email}, {$set: {password: userService.bcryptPassword(password)}});
            // Find & Update Reset Password and Set use true
            let tokenUsed = await resetPasswordService.tokenUsed(token);
            if (!tokenUsed) throw new ServerError(translate(req,__filename,'process-server-error','server error'));
            return this.success(translate(req,__filename,'process-password-changed','Your Password Changed Successfully !'), res);
        } catch (e: any) {
            next(e);
        }
    }

    async checkToken(token) {
        let resetPassword = await resetPasswordService.findOne({token});
        if (!resetPassword) return 404;
        if (resetPassword.use) return 403;
        return resetPassword;
    }
}

export default new ResetPasswordController();
