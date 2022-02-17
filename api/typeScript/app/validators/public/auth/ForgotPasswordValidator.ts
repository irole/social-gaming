import Validator from "../../Validator";

const {body} = require('express-validator');

class ForgotPasswordValidator extends Validator {

    handle() {
        return [
            body('email').trim().escape().isEmail().withMessage((value, {req}) => req.__('typeScript.app.http.validators.forgot-password-validator.email')).toLowerCase()
        ];
    }
}

export default new ForgotPasswordValidator();
