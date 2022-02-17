import {param} from 'express-validator';
import Validator from "../../Validator";
import translate from "../../../helpers/translate";

class RemoveFriendValidator extends Validator  {

    handle() {
        return [
            param('username')
                .trim()
                .escape()
                .toLowerCase()
                .isString().withMessage((value, {req}) => translate(req,__filename,'username-not-string','Only letters and digits allowed in title.'))
        ];
    }
}

export default new RemoveFriendValidator();
