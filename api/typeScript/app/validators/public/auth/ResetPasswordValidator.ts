import Validator from "../../Validator";


const {body} = require('express-validator');

class LoginValidator extends Validator {

    handle() {
        return [
            body('password').trim().escape().isLength({min: 8}).withMessage((value, {req}) => req.__('typeScript.app.http.validators.reset-password-validator.password')),
        ];
    }
}

export default new LoginValidator();
