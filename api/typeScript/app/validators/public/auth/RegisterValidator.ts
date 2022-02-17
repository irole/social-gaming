import translate from '../../../helpers/translate';
import Validator from "../../Validator";
import userService from "../../../services/UserService";
const {body} = require('express-validator');


class LoginValidator extends Validator {

    handle() {

        return [
            body('email')
            .trim()
            .escape()
            .isEmail()
            .withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'email-validate','email not valid');
            }).custom(async (value, {req}) => {

                let user = await userService.findOne({email: value});
                if (user) throw new Error(translate(req,__filename,'email-exist','this email registered before'));

            }),
            body('password')
            .trim()
            .escape()
            .isLength({min: 8})
            .withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'password-valid','password must more than 8 characters');
            }),
        ];
    }

}

export default new LoginValidator();
