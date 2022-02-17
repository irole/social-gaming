import Validator from "../../Validator";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class LoginValidator extends Validator {

    handle() {
        return [
            body('password')
            .isLength({min: 2}).escape()
            .withMessage((value, {req, location, path}) => {
                return translate(req,__filename,'password-valid','password must more than 8 characters');
            }),
        ];
    }
}

export default new LoginValidator();
