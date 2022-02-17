import Validator from "../../Validator";
import lobbyService from "../../../services/LobbyService";
import translate from "../../../helpers/translate";
const {param} = require('express-validator');

class LobbyValidator extends Validator {

    handle() {
        return [
            param('token').trim().escape().custom(async (value, {req}) => {
                if (req.params.token) {
                    if (value && value === '') throw new Error(translate(req,__filename,'token-invalid','invalid request !'));
                    let result = await lobbyService.checkTokenExist(value);
                    if (!result) throw new Error(translate(req,__filename,'token-not-exist','Lobby not Exist !'));
                    result = await lobbyService.checkLobbyCapacity(value);
                    if (!result) throw new Error(translate(req,__filename,'token-room-full','Room is full !'));
                }
                return;
            }),
            param('id').trim().escape().custom(async (value, {req}) => {
                if (req.params.id) {
                    if (value && value === '') throw new Error(translate(req,__filename,'id-invalid','invalid request !'));
                    let result = await lobbyService.findById(value);
                    if (!result) throw new Error(translate(req,__filename,'id-not-exist','Lobby not Exist !'));
                }
                return;
            }),
            param('name').trim().escape().custom(async (value, {req}) => {
                if (value && value === '') throw new Error(translate(req,__filename,'name-invalid','invalid request !'));
            }),
        ];
    }
}

export default new LobbyValidator();
