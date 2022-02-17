import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";
import userService from "../../../services/UserService";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class ChangeUsernameValidator extends Validator {
    handle() {
        return [
            body("username")
                .trim()
                .escape()
                .toLowerCase()
                .matches(/^[a-zA-Z]/, "g")
                .withMessage((value, {req}) => translate(req,__filename,'username-start','Invalid username : Only letters are allowed at start')).bail()
                .matches(/^[a-zA-Z]+[a-zA-Z0-9._]{1,}$/, "g")
                .withMessage((value, {req}) => translate(req,__filename,'username-special','Invalid username : Only letters and numbers are allowed.')).bail()
                .matches(/^[a-zA-Z][a-zA-Z0-9._]{1,}[a-zA-Z0-9]$/, "g")
                .withMessage((value, {req}) => translate(req,__filename,'username-end','Invalid username : Only letters and numbers are allowed at end.')).bail()
                .matches(/^[a-zA-Z][a-zA-Z0-9._]{3,12}[a-zA-Z0-9]$/, "g")
                .withMessage((value, {req}) => translate(req,__filename,'username-length','Invalid username : must be between 5-15 characters')).bail()

                .custom(async (value, {req}) => {
                        if (req.user.username === value) return;
                        if (!req.user.emailVerify) throw new Error(translate(req,__filename,'username-email-verify','you must verify your Email to change username ! '));
                        let userCan = await userService.checkLastUpdateUsername(req.user.email);
                        if (!userCan) throw new Error(`${translate(req,__filename,'username-update-date','you can not change your Username before :')} ${req.user.whenUserCanUpdateUsername.toLocaleString()}`);
                        let words = await badWordService.checkBadWordInString(value);
                        if (words) throw new Error(translate(req,__filename,'username-bad-word','You can not Bad Word Please Change And try again !'));
                    }
                )
        ];
    }
}

export default new ChangeUsernameValidator();
