import {param} from 'express-validator';
import Validator from "../../Validator";
import translate from "../../../helpers/translate";

class RequestProcessValidator extends Validator {

    handle() {
        return [
            param('username').trim().escape().toLowerCase()
            .isString().withMessage((value, {req}) => translate(req,__filename,'username-not-string','Only letters and digits allowed in title.'))
            .bail().custom(async (value, {req}) => {
                if (req.user.username === value) throw new Error(translate(req,__filename,'username-bad-request','Your Send bad Request !'));
            }),
            param('mode').trim().escape().toLowerCase().isString().custom(async (value, {req}) => {
                if (value !== "accept" && value !== "reject") throw new Error(translate(req,__filename,'mode-action-not-found','Action not Found !'));
            })
        ];
    }
}

export default new RequestProcessValidator();
