import Validator from "../../Validator";
import lobbyService from "../../../services/LobbyService";


const {param} = require('express-validator');


class LobbyValidator extends Validator {

    handle() {
        return [
            param('token').trim().escape().custom(async (value, {req}) => {
                if (req.params.token) {
                    if (value && value === '') throw new Error("invalid request !");
                    let result = await lobbyService.checkTokenExist(value);
                    if (!result) throw new Error("Lobby not Exist !");
                    result = await lobbyService.checkLobbyCapacity(value);
                    if (!result) throw new Error("Room is full !");
                }
                return;
            }),
            param('id').trim().escape().custom(async (value, {req}) => {
                if (req.params.id) {
                    if (value && value === '') throw new Error("invalid request !");
                    let result = await lobbyService.findById(value);
                    if (!result) throw new Error("Lobby not Exist !");
                }
                return;
            }),
            param('name').trim().escape().custom(async (value, {req}) => {
                if (value && value === '') throw new Error("invalid request !");
            }),
        ];
    }
}

export default new LobbyValidator();
