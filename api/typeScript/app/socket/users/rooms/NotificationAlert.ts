

class NotificationAlert {
    sendFriendRequest(io, namespace, request) {
        io.of(namespace).to(request.receiver).emit('notificationAlert:newFriendRequest', request);
    }
    getFriendOnline(io, namespace, onlineUser , username) {
        io.of(namespace).to(onlineUser).emit('notificationAlert:getFriendOnline', username);
    }
}

export default new NotificationAlert();
