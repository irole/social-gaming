import Validator from "../../Validator";


const {body} = require('express-validator');





class ChangeStatusValidator extends Validator {

    handle() {
        return [
            body('onlineStatus')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value !== "online" && value !== "invisible" && value !== "busy") throw new Error("status not Valid");
                }),
        ];
    }
}

export default new ChangeStatusValidator();
