import {param} from 'express-validator';
import Validator from "../Validator";


class LoadProfileValidator extends Validator {

    handle() {
        return [
            param('username')
                .trim()
                .escape()
                .toLowerCase()
                .isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.load-profile-validator.username.is-string'))
        ];
    }
}

export default new LoadProfileValidator();
