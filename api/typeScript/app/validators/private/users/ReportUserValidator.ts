import {body} from 'express-validator';
import Validator from "../../Validator";



class ReportUserValidator extends Validator {

    handle() {
        return [
            body('reportText')
                .trim()
                .escape()
                .custom(async (value, {req}) => {
                    if (value.length > 50 && value.length < 150) throw new Error("report Text required and must more than 50 characters and less than 150 characters")
                }),
        ];
    }
}

export default new ReportUserValidator();
