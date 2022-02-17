import {check, query} from 'express-validator';
import Validator from "../Validator";



class SearchValidator extends Validator {

    handle() {
        return [
            query('username').trim().isLength({min: 3}).withMessage((value, {req}) => req.__('typeScript.app.http.validators.search-validator.username.is-length')).escape().isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.search-validator.username.is-string'))
        ];
    }
}

export default new SearchValidator();
