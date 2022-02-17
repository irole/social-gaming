// Packages
import Controller from "./Controller";
import userService from "../../services/UserService";
import resetPasswordService from "../../services/ResetPasswordService";
import translate from "../../helpers/translate";

const uniqueString = require('unique-string');

class ForgotPasswordController extends Controller {

    async process(req, res, next) {
        try {
            // Get Input Value
            const {email} = req.body;
            // Select User Where Email
            let user = await userService.findOne({email});
            if (user) {
                let obj = {
                    email,
                    token: uniqueString()
                };
                // Build Reset Password token
                await resetPasswordService.insert(obj);
                // Send Email

                //
            }
            return this.success(translate(req,__filename,'process-success','Reset Password Link Send To Your Email'), res);
        } catch (e: any) {
            next(e);
        }
    }

    async sendResetLink(data) {
        return null;
    }
}

export default new ForgotPasswordController();
