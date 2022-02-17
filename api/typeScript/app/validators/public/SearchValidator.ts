import {check, query} from 'express-validator';
import Validator from "../Validator";
import translate from "../../helpers/translate";

class SearchValidator extends Validator {

    handle() {
        return [
            query('username').trim().isLength({min: 3})
            .withMessage((value, {req}) => translate(req,__filename,'username-length','username must be more than a 3 character'))
            .escape().isString().withMessage((value, {req}) => translate(req,__filename,'username-not-string','Only letters and digits allowed in title.'))
        ];
    }
}

export default new SearchValidator();
