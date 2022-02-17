import {param} from 'express-validator';
import Validator from "../../Validator";



class RemoveFriendValidator extends Validator  {

    handle() {
        return [
            param('username')
                .trim()
                .escape()
                .toLowerCase()
                .isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.remove-friend-validator.username.is-string'))
        ];
    }
}

export default new RemoveFriendValidator();
