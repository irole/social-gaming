

class NotificationCenter {

    sendFriendRequest(io, namespace, request) {
        io.of(namespace).to(request.receiver).emit('notificationCenter:newFriendRequest', request);
    }
}

export default new NotificationCenter();
