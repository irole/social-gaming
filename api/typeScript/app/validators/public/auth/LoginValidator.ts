import Validator from "../../Validator";


const {body} = require('express-validator');


class LoginValidator extends Validator {

    handle() {
        return [
            body('email').trim().escape().isEmail().withMessage((value, {req}) => req.__('typeScript.app.http.validators.login-validator.email')).toLowerCase(),
            body('password').trim().escape().isLength({min: 8}).withMessage((value, {req}) => req.__('typeScript.app.http.validators.login-validator.password'))
        ];
    }
}

export default new LoginValidator();
