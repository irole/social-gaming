import {body} from 'express-validator';
import Validator from "../../Validator";


class RegisterValidator extends Validator {

    handle() {
        return [
            body('email').trim().escape().isEmail().withMessage((value, {req}) => req.__('typeScript.app.http.validators.register-validator.email')).toLowerCase(),
            body('password').trim().escape().isLength({min: 8}).withMessage((value, {req}) => req.__('typeScript.app.http.validators.register-validator.password'))
        ];
    }
}

export default new RegisterValidator();
