import GlobalSocket from "./global/GlobalSocket";
import GuestsSocket from "./guests/GuestsSocket";
import UsersSocket from "./users/UsersSocket";

class SocketFactory {

    constructor(io) {
        new GlobalSocket(io);
        new GuestsSocket(io);
        new UsersSocket(io);
    }
}

export default SocketFactory;
