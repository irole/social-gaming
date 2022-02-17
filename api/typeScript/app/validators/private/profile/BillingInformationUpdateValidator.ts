import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";
import translate from "../../../helpers/translate";
const {body} = require('express-validator');

class BillingInformationUpdateValidator extends Validator {

    handle() {
        return [
            body('firstName').trim().escape().custom(async (value, {req}) => {
                if (value === '') throw new Error(translate(req,__filename,'first-name-required','firstname is required'));
                if (value.length < 3) throw new Error(translate(req,__filename,'first-name-min-length','firstname should be more than 2 characters'));
                if (value.length > 20) throw new Error(translate(req,__filename,'first-name-max-length','firstname should be less than 20 characters'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(translate(req,__filename,'first-name-bad-word','you should not use bad word in your firstname'));
            }),
            body('lastName').trim().escape().custom(async (value, {req}) => {
                if (value === '') throw new Error(translate(req,__filename,'last-name-required','lastname is required'));
                if (value.length < 3) throw new Error(translate(req,__filename,'last-name-min-length','lastname should be more than 2 characters'));
                if (value.length > 20) throw new Error(translate(req,__filename,'last-name-max-length','lastname should be less than 20 characters'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(translate(req,__filename,'last-name-bad-word','you should not use bad word in your lastname'));
            }),
            body('zipCode').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(translate(req,__filename,'zip-code-not-number','zip code must be number'))
                if (value.length !== 5 && value.length !== 9) throw new Error(translate(req,__filename,'zip-code-length','please insert valid zip code'))
            }),
            body('creditNumber').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(translate(req,__filename,'credit-number-not-number','credit Number must be number'))
                if (value.length < 13 || value.length > 19) throw new Error(translate(req,__filename,'credit-number-length','please insert valid credit number'))
            }),
            body('CVV').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(translate(req,__filename,'cvv-not-number','CVV must be number'))
                if (value.length < 3 || value.length > 4) throw new Error(translate(req,__filename,'cvv-invalid','please insert valid CVV'))
            }),
        ];
    }
}

export default new BillingInformationUpdateValidator();
