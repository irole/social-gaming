import Validator from "../../Validator";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class ChangeStatusValidator extends Validator {

    handle() {
        return [
            body('onlineStatus')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "online" && value !== "invisible" && value !== "busy") throw new Error(translate(req,__filename,'online-status-invalid','status not Valid'));
                }),
        ];
    }
}

export default new ChangeStatusValidator();
