// Packages
import translate from '../../helpers/translate';
// Controllers
import Controller from './Controller';

// Services

import userService from '../../services/UserService';
import resetPasswordService from "../../services/ResetPasswordService";

class ResetPasswordController extends Controller {

    async showResetPasswordForm(req, res, next) {
        try {
            // Page Title
            const title: string = translate(req, __filename, 'page-title-index', 'Reset Password');
            const {token} = req.params;
            const resetLink = await resetPasswordService.findOne({
                token,
                use: false
            });
            if (resetLink) return res.render('auth/reset-password', {
                token,
                title
            });
            const error: any = new Error(translate(req, __filename, 'not-found', 'Not Found !'));
            error.status = 404;
            throw error;

        } catch (e) {
            next(e);
        }
    }

    async resetPasswordProcess(req, res, next) {
        try {
            const {token} = req.body;
            // Select PasswordReset Where Token
            const resetLink = await resetPasswordService.findOne({token});
            if (resetLink) {
                // Find & Update User and Set Bcrypt Password
                await userService.findOneAndUpdate({email: resetLink.email}, {$set: {password: this.bcryptPassword(req.body.password)}});
                await resetPasswordService.findOneAndUpdate({token}, {$set: {use: true}});
            }

            return res.redirect('/auth/login');
        } catch (e) {
            next(e);
        }
    }

}

export default new ResetPasswordController();
