import {NotFoundError} from '../../errors/NotFoundError';
import {ClientError} from '../../errors/ClientError';
import {ServerError} from '../../errors/ServerError';
import Controller from "./Controller";
import resetPasswordService from "../../services/ResetPasswordService";
import userService from "../../services/UserService";
// Packages
const uniqueString = require('unique-string');

// Controllers

class ResetPasswordController extends Controller {
    async index(req, res, next) {
        try {
            const {token} = req.params;
            let resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.invalid-link'));
            if (resetPassword === 403) throw new ClientError(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.invalid-link'), 403);
            // Do Something
            return this.success(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.valid-link'), res);
        } catch (e) {
            next(e);
        }
    }

    async process(req, res, next) {
        try {
            const token = req.params.token;
            let resetPassword = await this.checkToken(token);
            if (resetPassword === 404) throw new NotFoundError(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.invalid-link'));
            if (resetPassword === 403) throw new ClientError(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.invalid-link'), 403);
            // Get Input Value
            const {password} = req.body;
            // Find & Update User and Set Bcrypt Password
            await userService.findOneAndUpdate({email: resetPassword.email}, {$set: {password: userService.bcryptPassword(password)}});
            // Find & Update Reset Password and Set use true
            let tokenUsed = await resetPasswordService.tokenUsed(token);
            if (!tokenUsed) throw new ServerError(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.server-error'));
            return this.success(req.__('typeScript.app.http.controllers.api.auth.reset-password-controller.password-changed'), res);
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
