import uniqueString from 'unique-string';
import {NotFoundError} from '../../errors/NotFoundError';
import gameService from "../../services/GameService";
import lobbyService from "../../services/LobbyService";
import {ClientError} from "../../errors/ClientError";
import {ServerError} from "../../errors/ServerError";
import Controller from "./Controller";
import translate from "../../helpers/translate";


class GameController extends Controller {

    async index(req, res, next) {
        try {
            const name = req.params.name;
            let game = await gameService.findOne({name});
            if (!game) throw new NotFoundError(translate(req,__filename,'index-game-not-found','Your Requested Game Not Found !'));
            res.render('home/game', {game});
        } catch (e) {
            next(e);
        }
    }


    async lobbyIndex(req, res, next) {
        try {

            let lobbyId = req.params.id;
            const populate = {
                path: 'players',
                select: 'username'
            };
            let lobby = await lobbyService.findById(lobbyId, populate);
            if (lobby.players.indexOf(req.user.id)) return res.render('home/lobby', {lobby});
            throw new ClientError(translate(req,__filename,'lobby-index-cant-join','your cant join this lobby without invitation'), 401);
        } catch (e) {
            next(e);
        }
    }

    async createLobby(req, res, next) {
        try {
            let name = req.params.name;
            let game = await gameService.findOne({name});
            let user = req.user.id;
            let lobby = await lobbyService.insert({
                game: game._id,
                players: user,
                host: user,
                inviteToken: uniqueString()
            });
            return res.json(lobby);
            //res.redirect(`/games/${name}/lobby/${lobby.id}`);
        } catch (e) {
            next(e);
        }
    }

    async inviteUserToLobby(req, res, next) {
        try {
            // get token from params
            const token = req.params.token;
            // get lobby Id from params
            const lobbyId = req.params.id;
            // get game name from params
            const gameName = req.params.name;
            // get user id in req.user
            const userId = req.user.id;
            // Invite to lobby process
            const result = await lobbyService.addUserViaInviteLink(token, userId);
            // redirect when user invited successfully
            if (result === 200) res.redirect(`/games/${gameName}/lobby/${lobbyId}`);
            // return error when server was wrong
            if (result === 500) throw new ServerError(translate(req,__filename,'invite-user-to-lobby-server-error','server Error !'))
        } catch (e) {
            next(e);
        }
    }

    async leftLobby(req, res, next) {
        try {
            // get lobby id with param
            const lobbyId = req.params.id;
            // get game name with param
            const gameName = req.params.name;
            // get user id in req.user
            const userId = req.user.id;
            // left user process
            let result = await lobbyService.leftUserFromLobby(gameName, lobbyId, userId);
            // redirect when user left successfully
            if (result === 200) res.redirect(`/games/${gameName}`);
            // return error when server was wrong
            if (result === 500) throw new ServerError(translate(req,__filename,'left-lobby-server-error','server Error !'))
        } catch (e) {
            next(e);
        }

    }
}

export default new GameController();
