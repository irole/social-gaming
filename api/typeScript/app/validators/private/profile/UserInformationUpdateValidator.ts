import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class UserInformationUpdateValidator extends Validator {

    handle() {
        return [
            body('biography').trim().escape().custom(async (value, {req}) => {
                if (value.length > 120) throw new Error(translate(req,__filename,'biography-max-value','Biography should not be more than 120 characters'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(translate(req,__filename,'biography-bad-word','you should not use bad word in your biography'));
            }),
            body('firstName').trim().escape().custom(async (value, {req}) => {
                if (value !== '') {
                    if (value.length < 3) throw new Error(translate(req,__filename,'first-name-min-length','firstname should be more than 2 characters'));
                    if (value.length > 20) throw new Error(translate(req,__filename,'first-name-max-length','firstname should be less than 20 characters'));
                }
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(translate(req,__filename,'first-name-bad-word','you should not use bad word in your firstname'));
            }),
            body('lastName').trim().escape().custom(async (value, {req}) => {
                if (value !== '') {
                    if (value.length < 3) throw new Error(translate(req,__filename,'last-name-min-length','lastname should be more than 2 characters'));
                    if (value.length > 20) throw new Error(translate(req,__filename,'last-name-max-length','lastname should be less than 20 characters'));
                }
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(translate(req,__filename,'last-name-bad-word','you should not use bad word in your lastname'));
            }),
            body('gender').trim().escape().custom(async (value, {req}) => {
                if (value !== "male" && value !== "female" && value !== "other") throw new Error(translate(req,__filename,'gender-invalid-value','gender not defined'));
            }),
        ];
    }
}

export default new UserInformationUpdateValidator();
