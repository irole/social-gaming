import {param} from 'express-validator';
import Validator from "../../Validator";


class RequestProcessValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase().isString().withMessage((value, {req}) => req.__('typeScript.app.http.validators.request-process-validator.is-string')).bail().custom(async (value, {req}) => {
                if (req.user.username === value) throw new Error(req.__('typeScript.app.http.validators.request-process-validator.bad-request'));
            }),
            param('mode').trim().escape().toLowerCase().isString().custom(async (value, {req}) => {
                if (value !== "accept" && value !== "reject") throw new Error(req.__('typeScript.app.http.validators.request-process-validator.action-not-found'));
            })
        ];
    }
}

export default new RequestProcessValidator();
