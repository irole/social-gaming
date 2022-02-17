const _ = require('underscore');

class GlobalUsers {

    private onlineGlobalUsers: any = [];

    setOnline(socketId, username, path) {

        // online Global Users When not Empty
        if (this.getOnlineGlobalUsers().length > 0) {
            this.getOnlineGlobalUsers().forEach(user => {
                // Replace path and socket id of user
                if (user.username == username) {
                    user.path = path;
                    user.socketId = socketId;
                } else {
                    // add user to Array
                    this.setOnlineGlobalUsers(socketId, username, path);
                }
            })

        } else { // online Global Users When Empty
            // add user to Array
            this.setOnlineGlobalUsers(socketId, username, path);
        }
    }

    setOnlineGlobalUsers(socketId, username, path) {
        let user = {socketId, username, path};
        this.onlineGlobalUsers.push(user);
    }

    getOnlineGlobalUsers() {
        return this.onlineGlobalUsers;
    }

    getOffline(username) {
        // Delete disconnected user from Array
        this.onlineGlobalUsers = _.without(this.getOnlineGlobalUsers(), _.findWhere(this.getOnlineGlobalUsers(), {username}));
    }

}

export default new GlobalUsers();
