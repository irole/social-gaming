import {body} from 'express-validator';
import Validator from "../../Validator";
import translate from "../../../helpers/translate";

class ReportUserValidator extends Validator {

    handle() {
        return [
            body('reportText')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value.length > 50 && value.length < 150) throw new Error(translate(req,__filename,'report-text-length','report Text required and must more than 50 characters and less than 150 characters'))
                }),
        ];
    }
}

export default new ReportUserValidator();
