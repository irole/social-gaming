
// Packages
const autoBind = require('auto-bind');

export default class Socket {
    protected io: any;

    constructor(io) {
        autoBind(this);
        this.setIo(io);
    }

    setIo(io): void {
        this.io = io;
    }

    getIo() {
        return this.io;
    }

    joinRoom(socket, roomName) {
        socket.join(roomName);
    }

}

