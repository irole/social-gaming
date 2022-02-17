import Validator from "../../Validator";
import gameService from "../../../services/GameService";
import translate from "../../../helpers/translate";
const {param} = require('express-validator');

class GameValidator extends Validator {

    handle() {
        return [
            param('name').trim().escape().custom(async (value, {req}) => {
                if (value && value === '') throw new Error(translate(req,__filename,'name-invalid','invalid request !'));
                let result = await gameService.findOne({name: value});
                if (!result) throw new Error(translate(req,__filename,'name-not-found','Your Requested Game Not Found !'));
            }),
        ];
    }
}

export default new GameValidator();
