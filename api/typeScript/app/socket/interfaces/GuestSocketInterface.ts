interface GuestsSocketInterface {
    onConnection();

    guestsProcess(globalSocket);

    joinRoom(socket, roomName);
}
