import Validator from "../../Validator";
import badWordService from "../../../services/BadWordService";


const {body} = require('express-validator');


class BillingInformationUpdateValidator extends Validator {

    handle() {
        return [
            body('firstName').trim().escape().custom(async (value, {req}) => {
                if (value === '') throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.firstname.not-empty'));
                if (value.length < 3) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.firstname.min-value'));
                if (value.length > 20) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.firstname.max-value'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.firstname.bad-word'));
            }),
            body('lastName').trim().escape().custom(async (value, {req}) => {
                if (value === '') throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.lastname.not-empty'));
                if (value.length < 3) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.lastname.min-value'));
                if (value.length > 20) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.lastname.max-value'));
                let haveBadWords = await badWordService.checkBadWordInString(value);
                if (haveBadWords) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.lastname.bad-word'));
            }),
            body('zipCode').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.zip-code.is-nan'))
                if (value.length !== 5 && value.length !== 9) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.zip-code.not-valid'))
            }),
            body('creditNumber').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.credit-number.is-nan'))
                if (value.length < 13 || value.length > 19) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.credit-number.not-valid'))
            }),
            body('CVV').trim().escape().custom(async (value, {req}) => {
                if (isNaN(value)) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.cvv.is-nan'))
                if (value.length < 3 || value.length > 4) throw new Error(req.__('typeScript.app.http.validators.billing-information-update-validator.cvv.not-valid'))
            }),
        ];
    }
}

export default new BillingInformationUpdateValidator();
