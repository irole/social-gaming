import Socket from "../Socket";

class GuestsSocket extends Socket {
    guestNs = Option['namespace'].guests;

    constructor(io) {
        super(io);
        this.onConnection();
    }

    onConnection() {
        this.io.of(this.guestNs)
            .on('connection', this.guestsProcess);
    }

    guestsProcess(globalSocket) {
    }

}

export default GuestsSocket;
