interface UsersSocketInterface {
    onConnection();

    usersProcess(globalSocket);

    joinRoom(socket, roomName);
}
