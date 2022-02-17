import Socket from "../Socket";
import globalUsers from "../../helpers/GlobalUsers";
import gameLobby from "./GameLobby";


export default class GlobalSocket extends Socket {

    globalNs: string = Option['namespace'].global;

    constructor(io) {
        super(io);
        this.onConnection();
    }

    onConnection() {
        this.getIo()
            .of(this.globalNs)
            .on('connection', this.globalProcess);
    }

    globalProcess(globalSocket) {

        // Data contain Path and Username
        globalSocket.on('Global:addUser', (data) => {
            this.joinRoom(globalSocket, data.username);
            globalUsers.setOnline(globalSocket.id, data.username, data.path);
        });

        globalSocket.on('Global:joinLobby', (joinLobbyData) => {
            gameLobby.joinRoom(this.io, this.globalNs, globalSocket, joinLobbyData);
            // lobbyGroupChat.updateUsersList(this.io, this.globalNs, globalSocket, joinLobbyData);
        });

        globalSocket.on('disconnecting', () => {

        });
    }

};

