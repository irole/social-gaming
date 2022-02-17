import Validator from "../../Validator";
import gameService from "../../../services/GameService";


const {param} = require('express-validator');


class GameValidator extends Validator {

    handle() {
        return [
            param('name').trim().escape().custom(async (value, {req}) => {
                if (value && value === '') throw new Error("invalid request !");
                let result = await gameService.findOne({name: value});
                if (!result) throw new Error("Your Requested Game Not Found !");
            }),
        ];
    }
}

export default new GameValidator();
