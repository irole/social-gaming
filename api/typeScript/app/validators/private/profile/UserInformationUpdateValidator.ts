import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";


const {body} = require('express-validator');


class UserInformationUpdateValidator extends Validator {

    handle() {
        return [
            body('biography').trim().escape().custom(async (value, {req}) => {
                if (value.length > 120) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.biography.max-value'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.biography.bad-word'));
            }),
            body('firstName').trim().escape().custom(async (value, {req}) => {
                if (value !== '') {
                    if (value.length < 3) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.firstname.min-value'));
                    if (value.length > 20) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.firstname.max-value'));
                }
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.firstname.bad-word'));
            }),
            body('lastName').trim().escape().custom(async (value, {req}) => {
                if (value !== '') {
                    if (value.length < 3) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.lastname.min-value'));
                    if (value.length > 20) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.lastname.max-value'));
                }
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.lastname.bad-word'));
            }),
            body('gender').trim().escape().custom(async (value, {req}) => {
                if (value !== "male" && value !== "female" && value !== "other") throw new Error(req.__('typeScript.app.http.validators.user-information-update-validator.gender.invalid-gender'));
            }),
        ];
    }
}

export default new UserInformationUpdateValidator();
