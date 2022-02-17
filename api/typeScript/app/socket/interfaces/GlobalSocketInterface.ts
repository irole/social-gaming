interface GlobalSocketInterface {
    onConnection();

    globalProcess(globalSocket);

    joinRoom(socket, roomName);
}
