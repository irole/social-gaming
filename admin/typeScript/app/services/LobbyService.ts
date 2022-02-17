import Lobby from "../models/lobby";
import Service from "./Service";
const _ = require('underscore')

class LobbyService extends Service {

    constructor() {
        super(Lobby);
    }

    async checkTokenExist(token: string) {
        let lobby = await this.findOne({inviteToken: token});
        return !!lobby;
    }

    async checkLobbyCapacity(token) {
        let lobby = await this.findOne({inviteToken: token});
        return lobby.players.length !== lobby.playerNeed;
    }

    async addUserViaInviteLink(token, userId) {
        let lobby = await this.findOne({inviteToken: token});
        lobby.players.push(userId);
        const result = await lobby.save();
        if (result) return 200;
        return 500;
    }

    async leftUserFromLobby(gameName, lobbyId, userId) {
        // find lobby with Id
        let lobby = await this.findById(lobbyId);
        // Remove Lobby when just One user in Lobby
        if (lobby.players.length === 1) await lobby.remove();
        // Check more than 1 user in lobby
        if (lobby.players.length > 1) {
            // find user index in lobby
            let userIndex = lobby.players.indexOf(userId);
            // Remove user from lobby players
            lobby.players = lobby.players.splice(userIndex, 1);
            // change host if left user is host and replace host with second user joined to lobby
            if (lobby.host.equals(userId)) lobby.host = lobby.players[0];
            // Save Changes
            let result = await lobby.save();
            if (result) return 200;
            return 500;
        }
    }

}

export default new LobbyService();
