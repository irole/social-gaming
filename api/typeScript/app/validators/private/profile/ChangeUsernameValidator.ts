import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";
import userService from "../../../services/UserService";


const {body} = require('express-validator');





class ChangeUsernameValidator extends Validator {
    handle() {
        return [
            body("username")
                .trim()
                .escape()
                .toLowerCase()
                .matches(/^[a-zA-Z]/, "g")
                .withMessage((value, {req}) => req.__('typeScript.app.http.validators.change-username-validator.start')).bail()
                .matches(/^[a-zA-Z]+[a-zA-Z0-9._]{1,}$/, "g")
                .withMessage((value, {req}) => req.__('typeScript.app.http.validators.change-username-validator.special')).bail()
                .matches(/^[a-zA-Z][a-zA-Z0-9._]{1,}[a-zA-Z0-9]$/, "g")
                .withMessage((value, {req}) => req.__('typeScript.app.http.validators.change-username-validator.end')).bail()
                .matches(/^[a-zA-Z][a-zA-Z0-9._]{3,12}[a-zA-Z0-9]$/, "g")
                .withMessage((value, {req}) => req.__('typeScript.app.http.validators.change-username-validator.username-length')).bail()

                .custom(async (value, {req}) => {
                        if (req.user.username === value) return;
                        if (!req.user.emailVerify) throw new Error(req.__('typeScript.app.http.validators.change-username-validator.email-not-validate'));
                        let userCan = await userService.checkLastUpdateUsername(req.user.email);
                        if (!userCan) throw new Error(`${req.__('typeScript.app.http.validators.change-username-validator.update-date')} ${req.user.whenUserCanUpdateUsername.toLocaleString()}`);
                        let words = await badWordService.checkBadWordInString(value);
                        if (words) throw new Error(req.__('typeScript.app.http.validators.change-username-validator.bad-word'));
                    }
                )
        ];
    }
}

export default new ChangeUsernameValidator();
